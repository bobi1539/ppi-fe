import { imageDownload } from "@/app/backend-api/file";
import { DIRECTORY_STAFF } from "@/app/constants/constant";
import { StaffResponse } from "@/app/dto/response/staff-response";
import Image from "next/image";
import Nl2Br from "../paragraph/nl2br";

interface DetailStaffProps {
  staff?: StaffResponse;
}

export default function DetailStaff(props: Readonly<DetailStaffProps>) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col items-center border border-gray-200 shadow rounded-lg p-6 hover:bg-gray-100">
        <Image src={imageDownload(DIRECTORY_STAFF, props.staff?.photo ?? "")} alt={props.staff?.name ?? ""} width={500} height={500} priority className="w-40 h-40 rounded-full border-4 border-gray-200 object-cover" />
        <h1 className="font-bold text-lg text-center text-gray-900 mt-2">{props.staff?.name}</h1>
        <h1 className="font-normal text-sm text-center text-gray-900">{props.staff?.position}</h1>
        <Nl2Br text={props.staff?.description ?? ""} className="mt-2" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-6 border border-gray-200 shadow rounded-lg hover:bg-gray-100">
          <h1 className="font-bold">{props.staff?.quote}</h1>
        </div>
        <div className="p-6 border border-gray-200 shadow rounded-lg hover:bg-gray-100">
          <h1 className="font-normal">
            <span className="font-bold">Funfact :</span> {props.staff?.funFact}
          </h1>
        </div>
        <div className="p-6 border border-gray-200 shadow rounded-lg hover:bg-gray-100">
          <Nl2Br text={props.staff?.jobDescription ?? ""} />
        </div>
      </div>
    </div>
  );
}
