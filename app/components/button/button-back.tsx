import Link from "next/link";
import ButtonIcon from "./button-icon";

interface ButtonBackProps {
  href: string;
}

export default function ButtonBack(props: Readonly<ButtonBackProps>) {
  return (
    <Link href={props.href}>
      <ButtonIcon type="button" icon="fa-solid fa-arrow-left" text="Back" className="w-auto px-5 py-2.5" color="bg-gray-500 hover:bg-gray-400" />
    </Link>
  );
}
