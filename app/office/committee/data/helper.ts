import { Option } from "@/app/components/input/input-select";
import { PeriodRequest } from "@/app/dto/request/period-request";

export const COMMITTEE_NAME: string = "committee-name";
export const START_DATE: string = "start-date";
export const END_DATE: string = "end-date";
export const STATUS: string = "status";

export const buildPeriodRequest = (formData: FormData): PeriodRequest => {
  return {
    name: formData.get(COMMITTEE_NAME) as string,
    startDate: formData.get(START_DATE) as string,
    endDate: formData.get(END_DATE) as string,
    status: String(formData.get(STATUS)) === "active",
  };
};

export const statusOptions: Option[] = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];
