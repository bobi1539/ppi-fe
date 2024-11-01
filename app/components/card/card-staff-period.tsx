import { imageDownload } from "@/app/backend-api/file";
import { DIRECTORY_STAFF } from "@/app/constants/constant";
import { StaffResponse } from "@/app/dto/response/staff-response";
import Image from "next/image";

interface CardStaffPeriodProps {
  staff: StaffResponse;
  onClick?: () => void;
}

export default function CardStaffPeriod(props: Readonly<CardStaffPeriodProps>) {
  return (
    <div onClick={props.onClick} className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] flex flex-col bg-white items-center p-6 border border-gray-200 shadow rounded-lg relative cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-xl`}>
      {props.staff.deleted && <div className="bg-gray-400/50 w-full h-full absolute rounded-lg cursor-pointer top-0 left-0" />}
      <Image src={imageDownload(DIRECTORY_STAFF, props.staff.photo)} alt={props.staff.name} width={500} height={500} priority className="w-40 h-40 rounded-full border-4 border-gray-200 object-cover" />
      <h1 className={`text-lg font-bold mt-2 text-center ${props.staff.deleted ? "line-through text-red-500" : ""}`}>{props.staff.name}</h1>
      <h1 className="text-sm text-center">{props.staff.position}</h1>
    </div>
  );
}
