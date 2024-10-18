interface InputLabelProps {
  value?: string | readonly string[] | number;
  label: string;
  name: string;
  type: string;
  placeHolder?: string;
  isRequired: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLabel(props: Readonly<InputLabelProps>) {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="block mb-1 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <input value={props.value} onChange={props.onChange} type={props.type} id={props.name} name={props.name} placeholder={props.placeHolder} required={props.isRequired} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary-700 focus:border-secondary-700 block w-full p-2.5" />
    </div>
  );
}
