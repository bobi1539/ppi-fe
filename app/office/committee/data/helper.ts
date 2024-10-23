import { Option } from "@/app/components/input/input-select-label";
import { PeriodRequest } from "@/app/dto/request/period-request";

export const COMMITTEE_NAME: string = "committee-name";
export const START_DATE: string = "start-date";
export const END_DATE: string = "end-date";
export const STATUS: string = "status";

export const buildPeriodRequest = (formData: FormData): PeriodRequest => {
  return {
    name: String(formData.get(COMMITTEE_NAME)),
    startDate: String(formData.get(START_DATE)),
    endDate: String(formData.get(END_DATE)),
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

export const getStatusOption = (status: boolean) :Option => {
  return {
    value: status ? "active" : "inactive",
    label: status ? "Active" : "Inactive"
  }
}
