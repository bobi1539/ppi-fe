import { Option } from "@/app/components/input/input-select-label";
import { StaffRequest } from "@/app/dto/request/staff-request";
import { buildUpdateFileUploadRequest, getFileFormData } from "@/app/utils/helper";

export const STAFF_NAME: string = "staff-name";
export const POSITION: string = "position";
export const IS_HEAD: string = "is-head";
export const QUOTE: string = "quote";
export const FUN_FACT: string = "fun-fact";
export const DESCRIPTION: string = "description";
export const JOB_DESCRIPTION: string = "job-description";
export const STAFF_PHOTO: string = "staff-photo";

export const buildStaffRequest = async (formData: FormData, divisionId: number, photoFileNameExisting?: string): Promise<StaffRequest> => {
  const photo = await getFileFormData(formData, STAFF_PHOTO);
  return {
    name: String(formData.get(STAFF_NAME)),
    position: String(formData.get(POSITION)),
    isHead: String(formData.get(IS_HEAD)) === "yes",
    quote: String(formData.get(QUOTE)),
    funFact: String(formData.get(FUN_FACT)),
    description: String(formData.get(DESCRIPTION)),
    jobDescription: String(formData.get(JOB_DESCRIPTION)),
    divisionId: divisionId,
    photo: photo ?? buildUpdateFileUploadRequest(photoFileNameExisting),
  };
};

export const isHeadOptions: Option[] = [
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
];

export const getIsHeadOption = (status: boolean): Option => {
  return {
    value: status ? "yes" : "no",
    label: status ? "Yes" : "No",
  };
};
