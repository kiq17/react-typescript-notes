import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App";

interface noteListProps {
    allNotesTags: Note[]
}

export const NoteList = ({ allNotesTags }: noteListProps) => {
    const { id } = useParams();
    const findNote = allNotesTags.find(note => note.id === id);

    if (!findNote) return <Navigate to="/" replace />;

    return <Outlet context={findNote} />;
};


export const useNote = () => {
    return useOutletContext<Note>();
};