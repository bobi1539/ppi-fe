interface ButtonIconProps {
  icon: string;
  text: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export default function ButtonIcon(props: Readonly<ButtonIconProps>) {
  return (
    <button onClick={props.onClick} type={props.type} className={`${props.className} text-sm px-4 py-2 flex items-center justify-center gap-2 text-white bg-secondary-700 hover:bg-secondary-600 font-medium rounded-lg`}>
      <i className={props.icon}></i>
      <span>{props.text}</span>
    </button>
  );
}
