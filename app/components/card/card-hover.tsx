interface CardHoverProps {
  children: React.ReactNode;
  isScale: boolean;
  onClick?: () => void;
}

export default function CardHover(props: Readonly<CardHoverProps>) {
  return (
    <div onClick={props.onClick} className={`${props.isScale ? "scale-110 shadow-2xl" : ""} relative p-2 transform transition-transform duration-300 rounded-lg hover:scale-110 hover:shadow-2xl`}>
      {props.children}
    </div>
  );
}
