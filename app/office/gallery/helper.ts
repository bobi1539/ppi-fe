import { Option } from "@/app/components/input/input-select-label";
import { FileUploadRequest } from "@/app/dto/request/file-upload-request";
import { GalleryRequest } from "@/app/dto/request/gallery-request";
import { EventResponse } from "@/app/dto/response/event-response";
import { fileToFileUploadRequest } from "@/app/utils/helper";

export const EVENT_ID: string = "event-id";
export const GALLERY_FILES: string = "gallery-files";

export const getEventOptions = (events: EventResponse[]): Option[] => {
  return events.map((event) => ({
    value: String(event.id),
    label: event.title,
  }));
};

export const getEventOptionsForSearch = (events: EventResponse[]): Option[] => {
  const options: Option[] = [
    {
      value: "",
      label: "--All--",
    },
  ];

  return options.concat(getEventOptions(events));
};

export const buildGalleryRequest = async (formData: FormData): Promise<GalleryRequest> => {
  const galleryFiles = formData.getAll(GALLERY_FILES);
  const fileUploads: FileUploadRequest[] = (
    await Promise.all(
      galleryFiles.map(async (file) => {
        return await fileToFileUploadRequest(file as File);
      })
    )
  ).filter((fileUpload): fileUpload is FileUploadRequest => fileUpload !== null);

  return {
    eventId: Number(formData.get(EVENT_ID)),
    fileUploads: fileUploads,
  };
};
