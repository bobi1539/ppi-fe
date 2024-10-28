import { StaffResponse } from "@/app/dto/response/staff-response";
import Nl2Br from "../paragraph/nl2br";
import Image from "next/image";
import { imageDownload } from "@/app/backend-api/file";
import { DIRECTORY_STAFF } from "@/app/constants/constant";
import ActionCard from "@/app/office/components/action-card";
import { limitText } from "@/app/utils/helper";

interface CardStaffOfficeProps {
  onClick: () => void;
  staff: StaffResponse;
  isShowBgGray: boolean;
  isShowAction: boolean;
  isScale: boolean;
  handleEditStaff: () => void;
  handleDeleteStaff: () => void;
  handleRestoreStaff: () => void;
}

export default function CardStaffOffice(props: Readonly<CardStaffOfficeProps>) {
  return (
    <div onClick={props.onClick} className={`${props.isScale ? "scale-110 shadow-2xl" : ""} w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] flex flex-col items-center p-6 border border-gray-200 shadow rounded-lg relative cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-xl`}>
      {props.isShowBgGray && <div className="bg-gray-400/50 w-full h-full absolute rounded-lg cursor-pointer top-0 left-0" />}
      <Image src={imageDownload(DIRECTORY_STAFF, props.staff.photo)} alt={props.staff.name} width={500} height={500} priority className="w-40 h-40 rounded-full border-4 border-gray-200 object-cover" />
      <h1 className={`text-lg font-bold mt-2 ${props.staff.deleted ? "line-through text-red-500" : ""}`}>{props.staff.name}</h1>
      <h1 className="text-sm">{props.staff.position}</h1>
      <Nl2Br text={limitText(props.staff.description, 222)} className="text-center text-sm font-medium mt-2" />
      {props.isShowAction && <ActionCard deleted={props.staff.deleted ?? false} handleEdit={props.handleEditStaff} handleDelete={props.handleDeleteStaff} handleRestore={props.handleRestoreStaff} />}
    </div>
  );
}
