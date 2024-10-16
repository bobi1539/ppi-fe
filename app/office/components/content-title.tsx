interface ContentTitleProps {
  title: string;
}

export default function ContentTitle(props: Readonly<ContentTitleProps>) {
  return <h1 className="mb-4 font-bold text-3xl text-secondary-700">{props.title}</h1>;
}
