import { useRef } from "react";
import * as PopOver from "@radix-ui/react-popover";

interface InputProps {
    label: string
    handleOnChange: (value: string) => void;
    value: string
    errorText?: string
    className?: string
    explanation?: boolean
    textExplanation?: string
    titleExplanation?: string
}

export const Input = ({ label, handleOnChange, value, errorText, className, explanation, textExplanation, titleExplanation }: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className={`${className} input-box relative w-80 transition-all h-13 rounded-md cursor-text border-2 border-zinc-400`}
            onClick={() => inputRef.current?.focus()}>

            <input ref={inputRef} className="w-full relative top-5 peer outline-none border-none p-2 h-7 placeholder-transparent text-zinc-500 bg-transparent" type="text" name="note" placeholder="a" autoComplete="off" onChange={e => handleOnChange(e.target.value)} value={value} />

            <label className="transition-all relative bottom-7 left-2 peer-focus:text-blue-300 text-sm text-zinc-300 pointer-events-none peer-focus:bottom-7 peer-focus:text-sm peer-placeholder-shown:bottom-4 peer-placeholder-shown:text-base" htmlFor="note">
                {label}
            </label>
            {explanation && <PopOver.Root>
                <PopOver.Trigger asChild>
                    <i className="fa-solid fa-circle-exclamation absolute top-1 right-2 cursor-pointer text-zinc-400" id="icon"></i>
                </PopOver.Trigger>
                <PopOver.Portal>
                    <PopOver.Content className="w-56 h-max bg-zinc-700 rounded-md p-3 z-[1000] data-[state='closed']:animate-hide data-[state='open']:animate-show">
                        <h3 className="text-white text-base font-bold mb-1">{titleExplanation}</h3>
                        <p className="text-white text-sm">{textExplanation}</p>
                        <PopOver.Arrow className="fill-black" />
                    </PopOver.Content>
                </PopOver.Portal>
            </PopOver.Root>}
            {errorText && <p className="absolute -bottom-6 left-2 text-rose-500 text-sm">{errorText}</p>}
        </div>
    );
};

