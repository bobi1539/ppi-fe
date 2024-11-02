import { fileDownload } from "@/app/backend-api/file";
import { DIRECTORY_EVENT } from "@/app/constants/constant";
import { EventResponse } from "@/app/dto/response/event-response";
import { formatDate } from "@/app/utils/date-helper";
import { limitText } from "@/app/utils/helper";
import Image from "next/image";

interface CardEventProps {
  event: EventResponse;
}

export default function CardEvent(props: Readonly<CardEventProps>) {
  return (
    <div className="grid grid-cols-5 gap-2 md:flex md:flex-col cursor-pointer">
      <div className="col-span-2 flex justify-center">
        <Image key={props.event.id} className="w-auto md:w-full h-40 md:h-64 xl:h-96 rounded-lg " src={fileDownload(DIRECTORY_EVENT, props.event.cover)} alt={`${props.event.title}`} width={1024} height={1024} priority />
      </div>
      <div className="col-span-3">
        <h3 className={`${props.event.deleted ? "text-red-500 line-through" : "text-gray-900"} text-xl font-bold`}>{props.event.title}</h3>
        <p className="text-xs text-gray-500">{formatDate(props.event.startDate)}</p>
        <p className="text-xs mb-2.5 text-gray-500">{`${props.event.startTime} - ${props.event.endTime} (${props.event.duration})`}</p>
        <p className="text-justify text-sm text-gray-800">{limitText(props.event.description, 100)}</p>
      </div>
    </div>
  );
}
