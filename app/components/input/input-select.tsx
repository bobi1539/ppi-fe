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
  return (
    <div className="mb-3 relative">
      <label htmlFor="tes" className="block mb-1 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <select name={props.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary-700 focus:border-secondary-700 block w-full px-2.5 py-[11px] appearance-none">
        {props.options.map((option) => (
          <option key={option.value} value={option.value} selected={option.value === props.currentValue}>
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
