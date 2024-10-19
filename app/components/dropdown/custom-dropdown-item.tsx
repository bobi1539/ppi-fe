import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

interface CustomDropdownItemProps {
  onClick: () => void;
  className: string;
  icon: string;
  text: string;
}

export default function CustomDropdownItem(props: Readonly<CustomDropdownItemProps>) {
  return (
    <DropdownMenuItem className="outline-none">
      <button onClick={props.onClick} type="button" className={`${props.className} w-full flex items-center gap-2 py-2 px-4 hover:text-white hover:bg-secondary-700 transition duration-200`}>
        <div className="w-6 h-6 flex justify-center items-center">
          <i className={props.icon} />
        </div>
        <span>{props.text}</span>
      </button>
    </DropdownMenuItem>
  );
}
