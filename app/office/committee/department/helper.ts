import { DivisionRequest } from "@/app/dto/request/division-request";

export const DEPARTMENT_NAME: string = "committee-name";
export const PERIOD_ID: string = "period-id";

export const buildDivisionRequest = (formData: FormData): DivisionRequest => {
  return {
    name: String(formData.get(DEPARTMENT_NAME)),
    periodId: Number(formData.get(PERIOD_ID)),
  };
};
