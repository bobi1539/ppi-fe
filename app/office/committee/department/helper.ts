import { Option } from "@/app/components/input/input-select";
import { DivisionRequest } from "@/app/dto/request/division-request";
import { PeriodResponse } from "@/app/dto/response/period-response";

export const DEPARTMENT_NAME: string = "committee-name";
export const PERIOD_ID: string = "period-id";

export const buildDivisionRequest = (formData: FormData): DivisionRequest => {
  return {
    name: String(formData.get(DEPARTMENT_NAME)),
    periodId: Number(formData.get(PERIOD_ID)),
  };
};

export const getPeriodOptions = (periods: PeriodResponse[]): Option[] => {
  return periods.map((period) => ({
    value: String(period.id),
    label: period.name,
  }));
};
