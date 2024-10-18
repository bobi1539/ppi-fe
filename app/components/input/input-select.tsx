"use client";

import { useEffect, useState } from "react";

export interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  label: string;
  name: string;
  options: Option[];
  currentValue?: string;
}

export default function InputSelect(props: Readonly<InputSelectProps>) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    setSelectedValue(props.currentValue ?? "");
  }, [props.currentValue]);

  return (
    <div className="relative">
      <label htmlFor={props.name} className="block mb-1 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} name={props.name} id={props.name} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary-700 focus:border-secondary-700 block w-full p-2.5 appearance-none">
        <option value="" disabled>
          --Select--
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-5 pointer-events-none text-gray-900">
        <i className="fas fa-chevron-down" />
      </div>
    </div>
  );
}
