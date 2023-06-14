import { KeyboardEvent, useEffect, useRef, useState } from "react"

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
    const [highLight, setHighLight] = useState(0);
    const conteinerRef = useRef<HTMLDivElement>(null);

    const clearOptions = (e: React.MouseEvent) => {
        e.stopPropagation()
        multiple ? onChange([]) : onChange(undefined)
    }

    const selected = (option: selectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            onChange(option)
        }
    }

    useEffect(() => {
        const handler = (e: Event) => {
            if (e.target != conteinerRef.current) return
            let k = (e as unknown as KeyboardEvent);
            switch (k.code) {
                case "Enter":
                    if(isOpen){
                        selected(options[highLight])
                        
                    }
                    break;
                case "Space":
                    setIsOpen(prev => !prev);
                    break;

                case "ArrowUp":
                case "ArrowDown":
                    if (!isOpen) {
                        setIsOpen(true)
                        break;
                    }
                    const newValue = highLight + (k.code == "ArrowDown" ? 1 : -1);
                    if (newValue >= 0 && newValue < options.length) {
                        setHighLight(newValue);
                    }
                    break;
                default:
                    break;
            }
        }

        conteinerRef.current?.addEventListener("keydown", handler);

        return () => {
            conteinerRef.current?.removeEventListener("keydown", handler);
        }
    }, [isOpen, highLight])

    return (
        <div tabIndex={0} className="w-96 p-2 min-h-[3.5em] border-2 border-zinc-400 flex items-center gap-5 relative focus:border-blue-300 rounded-md cursor-text" onClick={() => setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)} ref={conteinerRef}>
            <span className="flex-grow flex gap-3 flex-wrap">{multiple ? (
                value.map(item => (
                    <button key={item.value} onClick={e => {
                        e.stopPropagation();
                        selected(item)
                    }} className="flex gap-3 cursor-pointer border-2 border-zinc-400 items-center p-1 rounded-md group">
                        {item.label}
                        <i className="fa-solid fa-xmark group-hover:text-red-500"></i>
                    </button>
                ))
            ) : (value?.label)}</span>
            <i className="fa-solid fa-xmark cursor-pointer hover:text-zinc-400 transition-colors duration-300" role={"button"} onClick={clearOptions}></i>
            <div className="w-[2px] bg-zinc-400 self-stretch"></div>
            <i className="fa-solid fa-caret-down cursor-pointer"></i>
            <ul style={{top: "calc(100% + .30em)"}} className={`absolute border-2 border-zinc-400 rounded-md w-full left-0 shadow-2xl max-h-[15em] overflow-y-auto bg-white ${isOpen ? "visible" : "hidden"}`}>
                {options.map((option, index) => {

                    return (
                        <li className={`hover:bg-zinc-200 p-2 cursor-pointer ${index == highLight ? "bg-zinc-200" : ""}`} key={option.value}
                            onClick={e => {
                                e.stopPropagation()
                                selected(option)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
