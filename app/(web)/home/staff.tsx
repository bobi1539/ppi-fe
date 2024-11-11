"use client";

import { fileDownload } from "@/app/backend-api/file";
import { webStaffFindAll } from "@/app/backend-api/staff";
import { DIRECTORY_STAFF } from "@/app/constants/constant";
import { FE_WEB_DEPARTMENT } from "@/app/constants/endpoint-fe";
import { StaffResponse } from "@/app/dto/response/staff-response";
import { StaffSearchDto } from "@/app/dto/search/staff-search-dto";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface StaffProps {
  periodIdActive: number;
}

export default function Staff(props: Readonly<StaffProps>) {
  const autoplay = Autoplay({ delay: 3000 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [currentFaceId, setCurrentFaceId] = useState<number>(0);
  const [staffs, setStaffs] = useState<StaffResponse[]>([]);

  useEffect(() => {
    const buildSearchDto = (): StaffSearchDto => {
      let periodId = 1;
      if (props.periodIdActive) periodId = props.periodIdActive;
      return {
        search: "",
        periodId: periodId,
        isHead: true,
      };
    };

    const fetchStaff = async (): Promise<void> => {
      const response = await webStaffFindAll(buildSearchDto());
      setStaffs(response);
    };
    fetchStaff();

    if (!emblaApi) return;

    const onSelect = (): void => {
      setCurrentFaceId(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);

    return (): void => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, props.periodIdActive]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    setCurrentFaceId(index);
  };

  return (
    <section>
      <div className="bg-secondary-700 py-8">
        <div className="mb-8 mt-2 px-4 mx-8 md:mx-16 sm:px-6 md:px-8">
          <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-center">
            <p className="inline text-3xl sm:block md:inline text-white font-extrabold">Faces of PPI Warwick</p>
          </h2>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {staffs.map((staff) => (
                <div key={staff.id} className="min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-1/5 mx-2">
                  <div className="group md:mx-2">
                    <div className="text-center mb-2">
                      <h3 className="text-md text-white font-extrabold">
                        <b>{staff.division.name}</b>
                      </h3>
                    </div>
                    <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
                      <Link href={`${FE_WEB_DEPARTMENT}/${staff.division.id}`}>
                        <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
                          <Image key={staff.id} className="object-cover object-center w-full h-full md:w-full md:h-full" src={fileDownload(DIRECTORY_STAFF, staff.photo)} alt={`${staff.name}`} width={512} height={512} priority />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            {staffs.map((staff, index) => (
              <button onClick={() => scrollTo(index)} key={staff.id} className={`${index === currentFaceId ? "bg-white" : "bg-white/50"} w-3 h-3 rounded-full`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
