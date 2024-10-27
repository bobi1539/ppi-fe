import React from "react";

interface Nl2BrProps {
  text: string;
  className?: string;
}

export default function Nl2Br(props: Readonly<Nl2BrProps>) {
  const lines = props.text.split("\n");
  return (
    <p className={props.className}>
      {lines.map((line, index) => (
        <React.Fragment key={index + 1}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  );
}
