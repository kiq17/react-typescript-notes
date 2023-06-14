import "./styles/global.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Form, Tag } from "./components/Form";
import { useMemo } from "react";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";
import { Home } from "./components/Home";
import { NoteList } from "./components/NoteList";
import { ShowNote } from "./components/Note";
import { Update } from "./components/Update";


export interface Note extends NoteData {
    id: string;
}

export interface RawNote extends RawNoteData {
    id: string;
}

interface RawNoteData {
    note: string;
    markdown: string;
    tagsIds: string[];
}

export interface NoteData {
    note: string;
    markdown: string;
    tags: Tag[];
}



function App() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return { ...note, tags: tags.filter(tag => note.tagsIds.includes(tag.id)) };
        });
    }, [notes, tags]);

    const handleCreateNote = ({ tags, ...data }: NoteData) => {
        setNotes(prev => {
            return [...prev, { ...data, tagsIds: tags.map(tag => tag.id), id: crypto.randomUUID() }];
        });
    };

    const handleAddTag = (tag: Tag) => {
        setTags(prev => [...prev, tag]);
    };

    const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
        setNotes(prev => {
            return prev.map(note => {

                if (note.id === id) {
                    return { ...note, ...data, tagsIds: tags.map(tag => tag.id) };
                } else {
                    return note;
                }
            });
        });
    };

    const onDeleteNote = (id: string) => {
            setNotes(prev => {
                return prev.filter(note => note.id !== id);
            });
    };

    const updateTag = (id: string, label: string) => {
        setTags(prev => {
            return prev.map(tag => {
                if (tag.id === id) {
                    return { ...tag, label };
                } else {
                    return tag;
                }
            });
        });
    };

    const removeTag = (id: string) => {
        setTags(prev => {
            return prev.filter(tag => tag.id !== id);
        });
    };

    return (
        <div className="max-w-[1200px] m-auto p-10">
            <Routes>
                <Route path="/" element={<Home
                    avaliableTags={tags}
                    allNotesTags={notesWithTags}
                    onDeleteTag={removeTag}
                    onUpdateTag={updateTag}
                />
                } />
                <Route path="/new" element={<Form
                    onCreateNote={handleCreateNote}
                    onAddTag={handleAddTag}
                    avaliableTags={tags}
                />} />
                <Route path="/:id" element={<NoteList allNotesTags={notesWithTags} />}>
                    <Route index element={<ShowNote onDeleteNote={onDeleteNote} />} />
                    <Route path="edit" element={<Update onUpdateNote={onUpdateNote} avaliableTags={tags} onAddTag={handleAddTag} />} />
                </Route>
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        </div>
    );
}

export default App;
