export interface EventRequest {
  title: string;
  description: string;
  coverBase64: string | null;
  coverFileName: string | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}
