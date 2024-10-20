"use client";

import InputImage from "@/app/components/input/input-image";
import ContentTitle from "../../components/content-title";
import { DIRECTORY_EVENT } from "@/app/constants/constant";
import InputLabel from "@/app/components/input/input-label";
import { FE_EVENT } from "@/app/constants/endpoint-fe";
import Link from "next/link";
import ButtonIcon from "@/app/components/button/button-icon";
import TextArea from "@/app/components/input/text-area";
import { buildEventRequest, DESCRIPTION, END_DATE, END_TIME, START_DATE, START_TIME, TITLE } from "../helper";
import { eventCreate } from "@/app/backend-api/event";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";

export default function EventCreate() {
  const router = useRouter();

  const submitSaveEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildEventRequest(formData);
    await eventCreate(request);
    await showSuccessDialog();
    router.push(FE_EVENT);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <ContentTitle title="Add Event" />
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={submitSaveEvent}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 justify-center">
              <div className="col-span-2">
                <InputImage label="Upload Cover" directoryName={DIRECTORY_EVENT} inputName={"cover"} classNameImagePreview="border border-gray-200 rounded-lg" />
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <InputLabel label="Title" name={TITLE} type="text" placeHolder="Type title" isRequired={true} />
                <div className="grid grid-cols-2 gap-4">
                  <InputLabel label="Start Date" name={START_DATE} type="date" placeHolder="Type start date" isRequired={true} />
                  <InputLabel label="End Date" name={END_DATE} type="date" placeHolder="Type start date" isRequired={true} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputLabel label="Start Time" name={START_TIME} type="time" placeHolder="Type start time" isRequired={true} />
                  <InputLabel label="End Time" name={END_TIME} type="time" placeHolder="Type start time" isRequired={true} />
                </div>
                <TextArea label="Description" name={DESCRIPTION} rows={10} isRequired />
              </div>
            </div>
            <div className="flex justify-between">
              <Link href={FE_EVENT}>
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
