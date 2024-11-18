import { StudentRequest } from "./student-request";

export interface WebStudentRequest extends StudentRequest {
  secretKey: string;
}
