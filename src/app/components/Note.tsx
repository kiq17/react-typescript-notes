import { useNote } from "./NoteList";
import { FaTrash, FaPencilAlt, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface showNoteProps {
    onDeleteNote: (id: string) => void;
}

export const ShowNote = ({ onDeleteNote }: showNoteProps) => {
    const Note = useNote();
    const navigate = useNavigate();

    document.title = `Artigos | ${Note.note[0].toUpperCase() + Note.note.slice(1)}`;

    const handleDelete = () => {
        onDeleteNote(Note.id);
        navigate("/");
    };

    return (
        <>
            <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-4xl first-letter:uppercase">{Note.note}</h3>
                    <div className="flex gap-3">
                        {Note.tags.map(tag => <p key={crypto.randomUUID()} className="bg-blue-500 border-2 border-blue-400 rounded-full text-white px-4 py-1 text-center">{tag.label}</p>)}
                    </div>
                </div>
                <div className="flex gap-4 self-end">
                    <Link to={"/"} className="p-3 text-center border-2 rounded-md" title="Voltar">
                        <FaArrowLeft className="fill-slate-500 text-2xl" />
                    </Link>
                    <Link to={`/${Note.id}/edit`} className="p-3 text-center border-2 rounded-md" title="Editar">
                        <FaPencilAlt className="fill-blue-500 text-2xl" />
                    </Link>
                    <span onClick={handleDelete} className="p-3 text-center border-2 rounded-md cursor-pointer" title="Deletar">
                        <FaTrash className="fill-red-500 text-2xl" />
                    </span>
                </div>
            </div>
            <ReactMarkdown className="first-letter:uppercase">{Note.markdown}</ReactMarkdown>
        </>
    );
};