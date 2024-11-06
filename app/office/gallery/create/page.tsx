"use client";

import ContentTitle from "../../components/content-title";
import { FE_GALLERY } from "@/app/constants/endpoint-fe";
import { ChangeEvent, useEffect, useState } from "react";
import { EventResponse } from "@/app/dto/response/event-response";
import { eventFindAll } from "@/app/backend-api/event";
import { buildGalleryRequest, EVENT_ID, GALLERY_FILES, getEventOptions } from "../helper";
import InputSelectLabel from "@/app/components/input/input-select-label";
import InputFile from "@/app/components/input/input-file";
import { galleryCreate } from "@/app/backend-api/gallery";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import ButtonBack from "@/app/components/button/button-back";
import ButtonSave from "@/app/components/button/button-save";
import ButtonLoading from "@/app/components/button/button-loading";

export default function GalleryCreate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async (): Promise<void> => {
    const response = await eventFindAll({ search: "", isDeleted: false });
    setEvents(response);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildGalleryRequest(formData);
      await galleryCreate(request);
      await showSuccessDialog();
      router.push(FE_GALLERY);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGalleryFiles = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      setGalleryFiles(Array.from(files));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-lg">
        <ContentTitle title={"Add Gallery"} />
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-3 mb-6 justify-center">
              <InputSelectLabel label="Event" name={EVENT_ID} options={getEventOptions(events)} required />
              <InputFile onChange={handleGalleryFiles} name={GALLERY_FILES} label="Gallery File" isRequired multiple accept="image/*" />
              {galleryFiles.length > 1 &&
                galleryFiles.map((file, index) => (
                  <div key={index + 1} className="flex items-center gap-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 p-2 rounded">
                    <i className="fa-solid fa-file-lines fa-lg text-gray-500" />
                    <h1 className="truncate">{file.name}</h1>
                  </div>
                ))}
            </div>
            <div className="flex justify-between">
              <ButtonBack href={FE_GALLERY} />
              {isLoading ? <ButtonLoading className="px-9" /> : <ButtonSave />}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
