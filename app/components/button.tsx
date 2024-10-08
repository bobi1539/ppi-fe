interface ButtonProps {
  text: string;
  className?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button type="submit" className={`${props.className} flex-none rounded-md bg-secondary-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-600`}>
      {props.text}
    </button>
  );
}
