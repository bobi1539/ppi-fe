import { EventPerMonthResponse } from "./event-per-month-response";
import { StudentEducationResponse } from "./student-education-response";

export interface DashboardResponse {
  totalStudent: number;
  totalEvent: number;
  totalNewsletter: number;
  totalGallery: number;
  studentEducations: StudentEducationResponse[];
  eventPerMonths: EventPerMonthResponse[];
}
