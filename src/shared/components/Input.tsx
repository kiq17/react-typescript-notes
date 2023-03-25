import { useRef } from "react";

interface InputProps {
    label: string
    handleOnChange: (value: string) => void;
    value: string
    errorText?: string
    className?: string
}

export const Input = ({ label, handleOnChange, value, errorText, className }: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className={`${className} input-box relative w-80 transition-all h-13 rounded-md cursor-text border-2 border-zinc-400`}
            onClick={() => inputRef.current?.focus()}>

            <input ref={inputRef} className="w-full relative top-4 peer outline-none border-none p-2 h-5 placeholder-transparent text-zinc-500 bg-transparent" type="text" name="note" placeholder="a" autoComplete="off" onChange={e=> handleOnChange(e.target.value)} value={value} />

            <label className="transition-all relative bottom-7 left-2 peer-focus:text-blue-300 text-sm text-zinc-300 pointer-events-none peer-focus:bottom-7 peer-focus:text-sm peer-placeholder-shown:bottom-3 peer-placeholder-shown:text-base" htmlFor="note">
                {label}
            </label>
            {errorText && <p className="absolute -bottom-6 left-2 text-rose-500 text-sm">{errorText}</p>}
        </div>
    );
};

