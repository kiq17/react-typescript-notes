import { Input } from "../../shared/components/Input";
import CreatableReactSelect from "react-select/creatable";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "../App";
import { tagSelect } from "./Home";
import * as PopOver from "@radix-ui/react-popover";

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
    const navigate = useNavigate()

    document.title = "Artigos | Criar";

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onCreateNote({
            markdown,
            note,
            tags: selectedTags
        });
        navigate("/")
    };

    return (
        <section className="w-full">
            <div className="mb-14">
                <h2 className="text-4xl font-bold">Novo Note</h2>
                <p className="text-sm text-zinc-400">Clique em <i className="fa-solid fa-circle-exclamation text-zinc-400" id="icon"></i> para receber explicações.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex relative mt-5 items-center gap-3 flex-wrap">
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

                <textarea className="w-full resize-none rounded-md h-80 border-2 border-zinc-400 p-4 focus:border-blue-400 outline-none"
                    onChange={e => setMarkdown(e.target.value)}
                ></textarea>
                <button type="submit" className="py-3 px-5 rounded-md font-bold bg-blue-400 transition-colors hover:bg-blue-300 duration-500 text-white">Criar</button>
                <Link to=".." className="py-3 px-5 rounded-md text-white font-bold bg-zinc-400 transition-colors hover:bg-zinc-300 duration-500">Voltar</Link>

                <PopOver.Root>
                    <PopOver.Trigger asChild>
                        <i className="fa-solid fa-circle-exclamation absolute top-20 right-3 cursor-pointer text-zinc-400" id="icon"></i>
                    </PopOver.Trigger>
                    <PopOver.Portal>
                        <PopOver.Content className="w-56 h-max bg-zinc-700 rounded-md p-3 z-[1000] data-[state='closed']:animate-hide data-[state='open']:animate-show">
                            <h3 className="text-white text-base font-bold mb-1">Descrição</h3>
                            <p className="text-white text-sm">O texto a ser inserido possui formatação do tipo markdown, segue alguns exemplos:
                                <span className="mt-2 flex gap-1 flex-col">
                                    <span>[Seu link](http://seusite.com/)</span>
                                    <span>**Sua palvara** (Negrito)</span>
                                    <span>*Sua palvara* (Itálico)</span>
                                    <span>- Lista (Aparecer com um marker ao lado do item)</span>
                                    <span className="mt-2">É permitido o tamanho máximo de  2000 caracteres.</span>
                                </span>
                            </p>
                            <PopOver.Arrow className="fill-black" />
                        </PopOver.Content>
                    </PopOver.Portal>
                </PopOver.Root>
            </form>

        </section>
    );
};