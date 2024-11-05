"use client";

import { useEffect, useRef, useState } from "react";

interface InputCheckboxProps {
  id: string;
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
}

export default function InputCheckbox(props: Readonly<InputCheckboxProps>) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(props.checked ?? false);
  }, [props.checked]);

  return (
    <div className={`${props.className} border-b border-b-gray-200 flex items-center gap-3 p-2`}>
      <div className="relative flex items-center">
        <input type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} name={props.name} id={`${props.id}`} className={`w-[22px] h-[22px] appearance-none border  rounded ${isChecked ? "bg-secondary-700 border-secondary-700" : "bg-gray-50 border-gray-300"}`} disabled={props.disabled} checked={isChecked} />
        {isChecked && <i className="fa-solid fa-check text-white absolute top-1 left-1" onClick={() => setIsChecked(!isChecked)} />}
      </div>
      <label className={`${props.disabled ? "text-gray-400" : "text-gray-900"}`} htmlFor={`${props.id}`}>
        {props.label}
      </label>
    </div>
  );
}
