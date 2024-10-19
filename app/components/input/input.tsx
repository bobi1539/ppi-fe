interface InputProps {
  name: string;
  type: string;
  autoComplete: string;
  placeHolder: string;
  isRequired: boolean;
}

export default function Input(props: Readonly<InputProps>) {
  return (
    <input name={props.name} type={props.type} autoComplete={props.autoComplete} placeholder={props.placeHolder} required={props.isRequired} className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-700 sm:text-sm sm:leading-6 outline-none" />
  )
}