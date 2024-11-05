interface InputCheckboxProps {
  id: string;
  name: string;
  label: string;
  className?: string;
  disabled? :boolean;
  checked? :boolean;
}

export default function InputCheckbox(props: Readonly<InputCheckboxProps>) {
  return (
    <div className={`${props.className} border-b border-b-gray-200 flex items-center gap-3 p-2`}>
      <input type="checkbox" name={props.name} id={`${props.id}`} className="w-5 h-5" disabled={props.disabled} checked={props.checked} />
      <label className={`${props.disabled ? "text-gray-400" : "text-gray-900"}`} htmlFor={`${props.id}`}>
        {props.label}
      </label>
    </div>
  );
}
