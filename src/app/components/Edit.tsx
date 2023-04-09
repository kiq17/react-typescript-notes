import { Input } from "../../shared/components/Input";
import { Tag } from "./Form";

interface EditProps {
    allTags: Tag[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

export const Edit = ({ allTags, onUpdateTag, onDeleteTag }: EditProps) => {

    return (
        <form className="overflow-auto h-60 p-1">
            {allTags.length == 0 ? (<h4 className="text-center text-lg font-bold mt-24">Nenhuma tag foi criada ainda.</h4>) : (allTags.map(tag => {
                return (
                    <div key={tag.id} className="flex justify-between items-center gap-3">
                        <Input className="mb-5" label="tag" value={tag.label} handleOnChange={label => onUpdateTag(tag.id, label)} />
                        <span role={"button"} tabIndex={0} className="py-3 px-4 rounded-md border-2 border-red-400 self-start hover:bg-red-500 transition-colors duration-300 group" onClick={() => onDeleteTag(tag.id)}>
                            <i className="fa-solid fa-xmark group-hover:text-white" aria-label="Deletar"></i>
                        </span>
                    </div>
                );
            }))}
        </form>
    );
};

/* explicação markdown [Seu link](http://seusite.com/)
**Sua palvara** (Negrito)
*Sua palvara* (Itálico)
- Lista (Aparecer com um marker ao lado do item) */