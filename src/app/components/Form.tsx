import { Input } from "../../shared/components/Input";
import CreatableReactSelect from "react-select/creatable";
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { NoteData } from "../App";
import { tagSelect } from "./Home";

export interface Tag {
    id: string;
    label: string;
}

interface FormProps {
    onCreateNote: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    avaliableTags: Tag[]
}

export const Form = ({ onCreateNote, onAddTag, avaliableTags }: FormProps) => {
    const [note, setNote] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [selectedTags, setSelectedSTags] = useState<Tag[]>([]);

    document.title = "Artigos | Criar";

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onCreateNote({
            markdown,
            note,
            tags: selectedTags
        });
    };

    return (
        <section className="w-full">
            <h2>Novo Note</h2>
            <form onSubmit={handleSubmit} className="flex mt-5 items-center gap-3 flex-wrap">
                <Input
                    label="Insira seu note"
                    handleOnChange={value => setNote(value)}
                    value={note}
                    explanation={true}
                    titleExplanation="Criação Note"
                    textExplanation="Para criar uma note o nome dever ter tamanho máximo de 100 carecteres. Certifique-se do que foi escrito antes de salvar."
                />
                <CreatableReactSelect className="w-80 h-13"
                    onCreateOption={(label: string) => {
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
                    onChange={(tags) => {
                        setSelectedSTags(tags.map(tag => {
                            return { label: tag.label, id: tag.value };
                        }));
                    }}
                />

                <textarea className="w-full resize-none rounded-md h-80 border-2 border-zinc-400"
                    onChange={e => setMarkdown(e.target.value)}
                ></textarea>
                <button type="submit" className="py-3 px-5 rounded-md bg-blue-400 transition-colors hover:bg-blue-300 duration-500">Criar</button>
                <Link to=".." className="py-3 px-5 rounded-md bg-zinc-400 transition-colors hover:bg-zinc-300 duration-500">Voltar</Link>
            </form>

        </section>
    );
};