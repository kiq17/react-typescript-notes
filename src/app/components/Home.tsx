import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../shared/components/Input";
import ReactSelect from "react-select";
import { Card } from "./Card";
import { Tag } from "./Form";
import { Note } from "../App";
import * as Modal from "@radix-ui/react-dialog";
import { Edit } from "./Edit";

interface HomeProps {
    avaliableTags: Tag[]
    allNotesTags: Note[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

export interface tagSelect {
    label: string;
    value: string;
}

export const Home = ({ avaliableTags, allNotesTags, onDeleteTag, onUpdateTag }: HomeProps) => {
    const [inputValue, setInputvalue] = useState("");
    const [selectedTags, setSelectedSTags] = useState<Tag[]>([]);

    document.title = "Artigos | Home";

    const filteredSearch = useMemo(() => {
        return allNotesTags.filter(item => {
            return (inputValue === "" ||
                item.note.toLowerCase().includes(inputValue.toLowerCase())) && (selectedTags.length === 0 ||
                    selectedTags.every(tag => {
                        return item.tags.some(tagItem => tagItem.id === tag.id);
                    }));
        });
    }, [inputValue, selectedTags, allNotesTags]);

    return (
        <section className="w-full">
            <header className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-bold">Artigos</h1>
                <nav className="flex gap-3">
                    <Link to="/new" className="py-3 px-5 rounded-md text-white font-medium bg-blue-500 transition-colors hover:bg-blue-400 duration-300" tabIndex={0}>Criar</Link>
                    <Modal.Root>
                        <Modal.Trigger asChild>
                            <button type="button" className="py-3 px-5 rounded-md border-2 border-zinc-400 transition-colors hover:bg-zinc-400 duration-300 hover:text-white">Editar Tags</button>
                        </Modal.Trigger>
                        <Modal.Portal>
                            <Modal.Overlay className="w-screen h-screen bg-black/70 fixed inset-0" />
                            <Modal.Content
                                className="fixed p-10 w-1/2 h-max bg-white -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 data-[state=open]:animate-down data-[state=closed]:animate-up data-[state=closed]:pointer-events-none rounded-xl"
                            >
                                <Modal.Title className="text-2xl m-0 font-semibold">
                                    Editar tags
                                </Modal.Title>
                                <Modal.Description className="text-zinc-400  mb-5 text-[15px] leading-normal">
                                    Faça as mudanças nas tag aqui. Clique em salvar quando terminar.
                                </Modal.Description>
                                <Edit allTags={avaliableTags}
                                    onDeleteTag={onDeleteTag}
                                    onUpdateTag={onUpdateTag} />
                                <Modal.Close className="absolute right-4 top-4">
                                    <i className="fa-solid fa-xmark py-[2px] px-[8px] hover:bg-zinc-200 transition-colors duration-300 rounded-full text-xl" aria-label="Fechar"></i>
                                </Modal.Close>
                                <div className="mt-[25px] flex justify-end">
                                    <Modal.Close asChild>
                                        <button className="py-3 px-5 rounded-md text-white font-medium bg-blue-500 transition-colors hover:bg-blue-400 duration-300">Salvar</button>
                                    </Modal.Close>
                                </div>
                            </Modal.Content>
                        </Modal.Portal>
                    </Modal.Root>
                </nav>
            </header>
            <form className="flex items-center justify-between">
                <Input
                    label="Digite uma palavra"
                    value={inputValue}
                    handleOnChange={value => setInputvalue(value)}
                />
                <ReactSelect className="w-80 h-13"
                    value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id };
                    })}
                    options={avaliableTags.map(tag => {
                        return { label: tag.label, value: tag.id };
                    })}
                    onChange={(tags) => {
                        setSelectedSTags(tags.map(tag => ({ label: tag!.label, id: tag!.value })));
                    }}
                    isMulti
                />
            </form>
            <div className="cards mt-10 flex gap-10 flex-wrap">
                {filteredSearch.map(item => {
                    return (
                        <Card
                            key={item.id}
                            id={item.id}
                            title={item.note}
                            tags={item.tags}
                        />
                    );
                })}
            </div>
        </section>
    );
};