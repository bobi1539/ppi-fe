import { Option } from "@/app/components/input/input-select-label";
import { EventResponse } from "@/app/dto/response/event-response";

export const getEventOptions = (events: EventResponse[]): Option[] => {
  return events.map((event) => ({
    value: String(event.id),
    label: event.title,
  }));
};