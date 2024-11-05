"use client";

import InputImage from "@/app/components/input/input-image";
import { DIRECTORY_EVENT } from "@/app/constants/constant";
import InputLabel from "@/app/components/input/input-label";
import { FE_EVENT } from "@/app/constants/endpoint-fe";
import ButtonIcon from "@/app/components/button/button-icon";
import TextArea from "@/app/components/input/text-area";
import { COVER, DESCRIPTION, END_DATE, END_TIME, START_DATE, START_TIME, TITLE } from "./helper";
import ContentTitle from "../components/content-title";
import { useEffect, useState } from "react";
import { EventResponse } from "@/app/dto/response/event-response";
import ButtonBack from "@/app/components/button/button-back";

interface EventCreateOrUpdateProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  event?: EventResponse;
}

export default function EventCreateOrUpdate(props: Readonly<EventCreateOrUpdateProps>) {
  const [cover, setCover] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (props.event) {
      setCover(props.event.cover);
      setTitle(props.event.title);
      setStartDate(props.event.startDate);
      setEndDate(props.event.endDate);
      setStartTime(props.event.startTime);
      setEndTime(props.event.endTime);
      setDescription(props.event.description);
    }
  }, [props.event]);

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <ContentTitle title={props.title} />
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={props.submit}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4 justify-center">
              <div className="col-span-2">
                <InputImage label="Upload Cover" currentImage={cover} directoryName={DIRECTORY_EVENT} inputName={COVER} classNameImagePreview="border border-gray-200 rounded-lg" />
              </div>
              <div className="col-span-3 flex flex-col gap-3">
                <InputLabel label="Title" value={title} onChange={(e) => setTitle(e.target.value)} name={TITLE} type="text" placeHolder="Type title" isRequired={true} />
                <div className="grid grid-cols-2 gap-3">
                  <InputLabel label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} name={START_DATE} type="date" placeHolder="Type start date" isRequired={true} />
                  <InputLabel label="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} name={END_DATE} type="date" placeHolder="Type start date" isRequired={true} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputLabel label="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} name={START_TIME} type="time" placeHolder="Type start time" isRequired={true} />
                  <InputLabel label="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} name={END_TIME} type="time" placeHolder="Type start time" isRequired={true} />
                </div>
                <TextArea label="Description" currentValue={description} onChange={(e) => setDescription(e.target.value)} name={DESCRIPTION} rows={10} isRequired />
              </div>
            </div>
            <div className="flex justify-between">
              <ButtonBack href={FE_EVENT} />
              <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
