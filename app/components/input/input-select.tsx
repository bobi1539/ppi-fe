"use client";

import Select from "react-select";
import { Option } from "./input-select-label";
import { useEffect, useState } from "react";

interface InputSelectProps {
  placeholder?: string;
  name: string;
  options: Option[];
  option?: Option;
  padding?: string;
}

export default function InputSelect(props: Readonly<InputSelectProps>) {
  const [selectedOption, setSelectedOption] = useState<Option | null>();

  useEffect(() => {
    setSelectedOption(props.option);
  }, [props.option]);

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
  };

  return (
    <Select
      placeholder={props.placeholder ?? "--Select--"}
      name={props.name}
      value={selectedOption}
      onChange={handleChange}
      options={props.options}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: "#d1d5db",
          borderRadius: "0.5rem",
          backgroundColor: "#f9fafb",
          fontSize: "0.875rem",
          boxShadow: state.isFocused ? "inset 0 0 0 2px #6d28d9" : "none",
          "&:hover": {
            borderColor: "#d1d5db",
          },
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "0.875rem",
          backgroundColor: state.isSelected ? "#6d28d9" : "#fff",
          color: state.isSelected ? "#fff" : "#333",
          "&:hover": {
            backgroundColor: state.isSelected ? "#6d28d9" : "#eee",
          },
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          padding: props.padding,
        }),
      }}
    />
  );
}
