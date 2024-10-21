"use client";

import { imageDownload } from "@/app/backend-api/file";
import { DEFAULT_IMAGE_URL } from "@/app/constants/constant";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

interface InputImageProps {
  classNameImagePreview: string;
  inputName: string;
  currentImage?: string;
  directoryName: string;
  label?: string;
}

export default function InputImage(props: Readonly<InputImageProps>) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setCurrentImagePreview();
  }, [props.currentImage]);

  const setCurrentImagePreview = async (): Promise<void> => {
    if (props.currentImage && props.currentImage !== null) {
      setImagePreview(imageDownload(props.directoryName, props.currentImage));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4">
      <Image className={props.classNameImagePreview} src={imagePreview && imagePreview !== null ? imagePreview : DEFAULT_IMAGE_URL} alt="profile" width={500} height={500} priority />
      <label htmlFor="upload-photo" className="flex justify-center items-center gap-2 px-2.5 py-1.5 text-sm text-white bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200 cursor-pointer">
        <i className="fa-solid fa-upload" />
        <span>{props.label ?? "Upload Photo"}</span>
        <input onChange={handleImageChange} id="upload-photo" name={props.inputName} className="hidden" type="file" accept="image/*" />
      </label>
    </div>
  );
}
