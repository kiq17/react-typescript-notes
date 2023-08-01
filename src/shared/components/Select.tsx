import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react"

export interface selectOption {
    value: any
    label: string;
}

type multipleSelectProps = {
    multiple: true;
    value: selectOption[]
    onChange: (value: selectOption[]) => void
}

type singleSelectProps = {
    multiple?: false;
    value?: selectOption
    onChange: (value: selectOption | undefined) => void
}

type selcetProps = {
    options: selectOption[]
} & (singleSelectProps | multipleSelectProps)

export const Select = ({ multiple, value, options, onChange }: selcetProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highLights, setHighLights] = useState<number[]>([]);
    const [inputValue, setInptValue] = useState("");
    const conteinerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = useMemo(() => {
        return options.filter(item => {
            return item.label.toLowerCase().includes(inputValue) || item.label.toUpperCase().includes(inputValue)
        })
    }, [inputValue])

    const clearOptions = (e: React.MouseEvent) => {
        e.stopPropagation()
        multiple ? onChange([]) : onChange(undefined)

        setHighLights([]);
    }

    const selected = (option: selectOption, index?: number) => {
        if (index !== undefined) {
            if (highLights.includes(index)) {
                setHighLights(prev => prev.filter(i => i != index))
            } else {
                setHighLights(prev => [...prev, index]);
            }
        }
        if (multiple) {
            if (value.includes(option)) {
                let indexFinded = options.findIndex(val => val == option);
                onChange(value.filter(o => o !== option))
                setHighLights(prev => prev.filter(i => i != indexFinded));
            } else {
                onChange([...value, option])
            }
        } else {
            onChange(option)
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
        const handler = (e: Event) => {
            if (e.target != conteinerRef.current) return
            let k = (e as unknown as KeyboardEvent);
            switch (k.code) {
                case "Space":
                    setIsOpen(prev => !prev);
                    break;
                default:
                    break;
            }
        }

        conteinerRef.current?.addEventListener("keydown", handler);

        return () => {
            conteinerRef.current?.removeEventListener("keydown", handler);
        }
    }, [isOpen])


    return (
        <div tabIndex={0} className="w-96 p-2 min-h-[3.5em] border-2 border-zinc-400 flex items-center gap-5 relative rounded-md cursor-text"
            onClick={() => { setIsOpen(true); }}
            ref={conteinerRef}>
            <span className="flex-grow flex gap-3 flex-wrap">{
                multiple ? (
                    value.map(item => (
                        <button key={item.value} onClick={e => {
                            e.stopPropagation();
                            selected(item)
                        }} className="flex gap-3 cursor-pointer border-2 border-zinc-400 items-center p-1 rounded-md group">
                            {item.label}
                            <i className="fa-solid fa-xmark group-hover:text-red-500"></i>
                        </button>
                    ))
                ) : (value?.label)}
            </span>
            <i className="fa-solid fa-xmark cursor-pointer hover:text-zinc-400 transition-colors duration-300" role={"button"} onClick={clearOptions}></i>
            <div className="w-[2px] bg-zinc-400 self-stretch"></div>
            <i onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }} role={"button"} className={`fa-solid fa-caret-down cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}></i>
            <ul style={{ top: "calc(100% + .30em)" }} className={`absolute border-2 border-zinc-400 rounded-md w-full left-0 shadow-2xl max-h-[15em] overflow-y-auto bg-white ${isOpen ? "visible" : "hidden"}`} tabIndex={0}
            >
                <input ref={inputRef}
                    className="w-full p-2 outline-none" type="text"
                    value={inputValue}
                    onChange={(e) => setInptValue(e.target.value)}
                    placeholder="Procurar item"
                />
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => {
                        return (
                            <li className={`hover:bg-zinc-200 p-2 cursor-pointer ${highLights.includes(index) ? "bg-zinc-200" : ""}`} key={option.value}
                                onClick={e => {
                                    e.stopPropagation()
                                    selected(option, index)
                                    setIsOpen(false)
                                }}
                            >
                                {option.label}
                            </li>
                        )
                    }
                    )) :
                    (<p className="p-2">{options.length > 0 ? {inputValue} + "não encontrado." : "Nenhuma tag foi adicionada."}</p>)
                }
            </ul>
        </div >
    )
}
