import { fileDownload } from "@/app/backend-api/file";
import { DIRECTORY_SETTING } from "@/app/constants/constant";
import Image from "next/image";
import React from "react";

interface ImageCabinetProps {
  urlBanner: string;
}

export default function ImageCabinet(props: Readonly<ImageCabinetProps>) {
  return <Image key={"banner"} className="w-screen" src={fileDownload(DIRECTORY_SETTING, props.urlBanner)} alt="PPI Warwick Cabinet" width={1920} height={1080} priority />;
}
