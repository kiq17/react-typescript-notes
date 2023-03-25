import { Input } from "../../shared/components/Input";
import CreatableReactSelect from "react-select/creatable";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "../App";
import { useNote } from "./NoteList";

export interface Tag {
    id: string;
    label: string;
}

interface FormProps {
    onUpdateNote: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    avaliableTags: Tag[]
}

export const Update = ({ onUpdateNote, onAddTag, avaliableTags }: FormProps) => {
    const currentNote = useNote();
    const [note, setNote] = useState(currentNote.note);
    const [markdown, setMarkdown] = useState(currentNote.markdown);
    const [selectedTags, setSelectedSTags] = useState<Tag[]>(currentNote.tags);
    const navigate = useNavigate();

    document.title = "Artigos | Editar";

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onUpdateNote(currentNote.id, { markdown, note, tags: selectedTags });
        navigate("/");
    };

    return (
        <section className="w-full">
            <h2>Editar artigo</h2>
            <form onSubmit={handleSubmit} className="flex mt-5 items-center gap-3 flex-wrap">
                <Input
                    label="Insira seu note"
                    handleOnChange={value => setNote(value)}
                    value={note}
                />
                < CreatableReactSelect className="w-80 h-13"
                    onCreateOption={label => {
                        const newTag = { id: crypto.randomUUID(), label };
                        onAddTag(newTag);
                        setSelectedSTags(prev => [...prev, newTag]);
                    }}
                    options={avaliableTags.map(tag => {
                        return { label: tag.label, value: tag.id };
                    })}
                    isMulti
                    value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id };
                    })}
                    onChange={tags => {
                        setSelectedSTags(tags.map(tag => {
                            return { label: tag.label, id: tag.value };
                        }));
                    }}
                />

                <textarea className="w-full resize-none rounded-md h-80 border-2 border-zinc-400" value={markdown}
                    onChange={e => setMarkdown(e.target.value)}
                ></textarea>
                <button type="submit" className="py-3 px-5 rounded-md bg-blue-400 transition-colors hover:bg-blue-300 duration-500">Editar</button>
                <Link to=".." className="py-3 px-5 rounded-md bg-zinc-400 transition-colors hover:bg-zinc-300 duration-500">Voltar</Link>
            </form>

        </section>
    );
};