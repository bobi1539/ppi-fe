"use client";

import Link from "next/link";
import ContentTitle from "../../components/content-title";
import { FE_GALLERY } from "@/app/constants/endpoint-fe";
import ButtonIcon from "@/app/components/button/button-icon";
import { useEffect, useState } from "react";
import { EventResponse } from "@/app/dto/response/event-response";
import { eventFindAll } from "@/app/backend-api/event";
import { buildGalleryRequest, EVENT_ID, GALLERY_FILES, getEventOptions } from "../helper";
import InputSelectLabel from "@/app/components/input/input-select-label";
import InputFile from "@/app/components/input/input-file";
import { galleryCreate } from "@/app/backend-api/gallery";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";

export default function GalleryCreate() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async (): Promise<void> => {
    const response = await eventFindAll({ search: "", isDeleted: false });
    setEvents(response);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildGalleryRequest(formData);
    await galleryCreate(request);
    await showSuccessDialog();
    router.push(FE_GALLERY);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-lg">
        <ContentTitle title={"Add Gallery"} />
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-3 mb-4 justify-center">
              <InputSelectLabel label="Event" name={EVENT_ID} options={getEventOptions(events)} required />
              <InputFile name={GALLERY_FILES} label="Gallery File" isRequired multiple accept="image/*" />
            </div>
            <div className="flex justify-between">
              <Link href={FE_GALLERY}>
                <ButtonIcon type="button" icon="fa-solid fa-arrow-left" text="Back" className="w-auto px-5 py-2.5" color="bg-gray-500 hover:bg-gray-400" />
              </Link>
              <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
