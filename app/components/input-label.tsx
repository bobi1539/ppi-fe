interface InputLabelProps {
  name: string;
  type: string;
  placeHolder: string;
  isRequired: boolean;
}

export default function InputLabel(props: InputLabelProps) {
  return (
    <div>
      <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-900">
        Username
      </label>
      <input type={props.type} name={props.name} placeholder={props.placeHolder} required={props.isRequired} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary-700 focus:border-secondary-700 block w-full p-2.5" />
    </div>
  );
}
