"use client";

import { Label } from "@radix-ui/react-dropdown-menu";

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioButtonProps {
  className?: string;
  label: string;
  options: RadioOption[];
  name: string;
  selectedValue: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function RadioButton(props: Readonly<RadioButtonProps>) {
  return (
    <div>
      <Label className="block mb-1 text-sm font-medium text-gray-900">
        {props.label} {props.required ? <span className="text-red-500">*</span> : ""}
      </Label>
      <div className={props.className}>
        {props.options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 ml-4">
            <input type="radio" name={props.name} value={option.value} checked={props.selectedValue === option.value} onChange={props.onChange} required={props.required} className="appearance-none border border-gray-500 w-3.5 h-3.5 rounded-full checked:bg-secondary-700 checked:border-transparent relative" />
            <style>{`
              input[type="radio"]:checked::before {
                content: "";
                display: block;
                width: 0.3rem;
                height: 0.3rem;
                border-radius: 50%;
                background-color: white;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            `}</style>
            <span className="text-gray-500">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
