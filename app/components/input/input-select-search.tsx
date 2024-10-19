import { Option } from "./input-select";

interface InputSelectNoLabelProps {
  title: string;
  name: string;
  options: Option[];
  currentValue?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function InputSelectSearch(props: Readonly<InputSelectNoLabelProps>) {
  return (
    <div className="w-full relative">
      <select value={props.currentValue} onChange={props.onChange} name={props.name} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-inset focus:ring-2 focus:ring-secondary-700 block w-full px-2.5 py-2 appearance-none outline-none">
        <option value="">{props.title}</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-900">
        <i className="fas fa-chevron-down" />
      </div>
    </div>
  );
}
