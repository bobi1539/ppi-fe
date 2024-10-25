import { EventRequest } from "@/app/dto/request/event-request";
import { buildUpdateFileUploadRequest, getFileFormData } from "@/app/utils/helper";

export const TITLE: string = "title";
export const DESCRIPTION: string = "description";
export const START_DATE: string = "start-date";
export const END_DATE: string = "end-date";
export const START_TIME: string = "start-time";
export const END_TIME: string = "end-time";
export const COVER: string = "cover";

export const buildCreateEventRequest = async (formData: FormData): Promise<EventRequest> => {
  const cover = await getFileFormData(formData, COVER);
  return {
    title: String(formData.get(TITLE)),
    description: String(formData.get(DESCRIPTION)),
    startDate: String(formData.get(START_DATE)),
    endDate: String(formData.get(END_DATE)),
    startTime: String(formData.get(START_TIME)),
    endTime: String(formData.get(END_TIME)),
    cover: cover,
  };
};

export const buildUpdateEventRequest = async (formData: FormData, coverFileNameExisting: string): Promise<EventRequest> => {
  const cover = await getFileFormData(formData, COVER);
  return {
    title: String(formData.get(TITLE)),
    description: String(formData.get(DESCRIPTION)),
    startDate: String(formData.get(START_DATE)),
    endDate: String(formData.get(END_DATE)),
    startTime: String(formData.get(START_TIME)),
    endTime: String(formData.get(END_TIME)),
    cover: cover ?? buildUpdateFileUploadRequest(coverFileNameExisting),
  };
};
