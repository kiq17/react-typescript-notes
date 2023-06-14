import { Link } from "react-router-dom";
import { Tag } from "./Form";

interface cardProps {
    id: string;
    title: string;
    tags: Tag[]
}

export const Card = ({ id, title, tags }: cardProps) => {
    return (
        <Link className="w-[350px] m-auto" to={`/${id}`}>
            <div className="p-5 flex flex-col gap-3 rounded-md shadow-xl hover:scale-105 bg-zinc-50 transition-transform h-40">
                <h2 className="m-auto font-semibold text-xl first-letter:uppercase">{title}</h2>
                <div className="flex gap-3 m-auto flex-wrap">
                    {tags.map(tag => <p key={tag.id} className="bg-blue-500 border-2 border-blue-400 rounded-full px-4 py-1 text-center text-white">{tag.label}</p>)}
                </div>
            </div>
        </Link>
    );
};