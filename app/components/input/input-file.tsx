import { useRef } from "react";

interface InputFileProps {
  name: string;
  label: string;
  isRequired?: boolean;
  accept: string;
  multiple?: boolean;
}

export default function InputFile(props: Readonly<InputFileProps>) {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative">
      <label htmlFor={props.name} className="block mb-1 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <button onClick={() => inputFileRef.current?.click()} type="button" className={`${props.multiple ? "px-[17px]" : "px-3.5"} absolute bottom-0 left-0 hover:bg-secondary-600 bg-secondary-700 text-white rounded-l-lg text-sm py-[11px] transition duration-200`}>
        Choose File
      </button>
      <input ref={inputFileRef} type="file" id={props.name} name={props.name} required={props.isRequired} accept={props.accept} multiple={props.multiple} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-inset focus:ring-2 focus:ring-secondary-700 w-full py-[7px] px-2.5 outline-none " />
    </div>
  );
}
