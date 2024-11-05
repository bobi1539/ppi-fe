import Image from "next/image";
import React from "react";

interface ImageCabinetProps {
  urlBanner: string;
}

export default function ImageCabinet(props: Readonly<ImageCabinetProps>) {
  return <Image key={"banner"} className="w-screen" src={props.urlBanner} alt="PPI Warwick Cabinet" width={1920} height={1080} priority />;
}
