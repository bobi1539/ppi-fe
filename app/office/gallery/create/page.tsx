"use client";

import Link from "next/link";
import ContentTitle from "../../components/content-title";
import { FE_GALLERY } from "@/app/constants/endpoint-fe";
import ButtonIcon from "@/app/components/button/button-icon";
import { useEffect, useState } from "react";
import { EventResponse } from "@/app/dto/response/event-response";
import { eventFindAll } from "@/app/backend-api/event";
import InputSearch from "../../components/input-search";
import { DropdownMenu, DropdownMenuContent, DropdownMenuPortal, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function GalleryCreate() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [searchEvent, setSearchEvent] = useState<string>("");

  useEffect(() => {
    fetchEvent();
  }, [searchEvent]);

  const fetchEvent = async (): Promise<void> => {
    const response = await eventFindAll({ search: searchEvent, isDeleted: false });
    console.log(response);
    setEvents(response);
  };

  const [isDropdownSelectOpen, setIsDropdownSelectOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-lg">
        <ContentTitle title={"Add Gallery"} />
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form>
            <div className="grid grid-cols-1 gap-4 mb-4 justify-center">
              <DropdownMenu open={isDropdownSelectOpen} onOpenChange={() => setIsDropdownSelectOpen(!isDropdownSelectOpen)}>
                <DropdownMenuTrigger type="button" className="outline-none flex justify-between items-center text-sm p-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg cursor-default">
                  <span>Select Event</span>
                  <i className="fa-solid fa-chevron-down" />
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent className="mt-2 w-96 bg-gray-700 border border-gray-300 rounded-lg text-sm text-gray-900 p-2.5">
                    <div className="w-full">
                      <InputSearch onChange={(e) => setSearchEvent(e.target.value)} />
                      <ul className="flex flex-col gap-2 pt-4 text-white max-h-36 overflow-y-scroll">
                        {events.map((event) => (
                          <li key={event.id} className="hover:bg-gray-50 hover:text-gray-900 p-2 rounded-lg">
                            <button onClick={() => setIsDropdownSelectOpen(false)} className="">
                              {event.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
              <div className="w-full h-32"></div>
            </div>
            <div className="flex justify-between">
              <Link href={FE_GALLERY}>
                <ButtonIcon type="button" icon="fa-solid fa-arrow-left" text="Back" className="w-auto px-5 py-2.5" color="bg-gray-500 hover:bg-gray-400" />
              </Link>
              <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
