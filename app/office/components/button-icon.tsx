interface ButtonIconProps {
  icon: string;
}

export default function ButtonIcon(props: Readonly<ButtonIconProps>) {
  return (
    <button type="button" className="w-full md:w-auto flex items-center justify-center gap-2 text-white bg-secondary-700 hover:bg-secondary-600 font-medium rounded-lg text-sm px-4 py-2">
      <i className={props.icon}></i>
      <span>Add User Role</span>
    </button>
  );
}
