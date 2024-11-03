"use client";

import { fileDownload } from "@/app/backend-api/file";
import { webGalleryFindAll } from "@/app/backend-api/gallery";
import { DIRECTORY_GALLERY } from "@/app/constants/constant";
import { GalleryResponse } from "@/app/dto/response/gallery-response";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Support() {
  const [galleries, setGalleries] = useState<GalleryResponse[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentImageId, setCurrentImageId] = useState<number>(0);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async (): Promise<void> => {
    const response = await webGalleryFindAll({ search: "", eventId: 44 });
    setGalleries(response);
  };

  const prev = () => {
    emblaApi?.scrollPrev();
    setCurrentImageId(emblaApi?.selectedScrollSnap() ?? 0);
  };

  const next = () => {
    emblaApi?.scrollNext();
    setCurrentImageId(emblaApi?.selectedScrollSnap() ?? 0);
  };

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    setCurrentImageId(index);
  };

  return (
    <section>
      <div className=" bg-tertiary-100 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-24 px-6 md:grid-cols-2 md:px-8">
          <div className="relative">
            <div className="overflow-hidden relative rounded-lg" ref={emblaRef}>
              <div className="flex">
                {galleries.map((gallery) => (
                  <div key={gallery.id} className="min-w-0 flex-shrink-0 flex-grow-0 basis-full h-56 lg:h-96">
                    <Image className="w-full h-full object-cover object-center" src={fileDownload(DIRECTORY_GALLERY, gallery.fileName)} alt={`${gallery.event.title}-gallery`} width={512} height={512} priority />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex absolute bottom-8 left-1/2 z-30 space-x-3 -translate-x-1/2">
              {galleries.map((gallery, index) => (
                <button onClick={() => scrollTo(index)} key={gallery.id} type="button" className={`${index === currentImageId ? "bg-white" : "bg-white/50"} w-3 h-3 rounded-full hover:bg-white`} />
              ))}
            </div>
            <button onClick={prev} type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev="">
              <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden">Previous</span>
              </span>
            </button>
            <button onClick={next} type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next="">
              <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="hidden">Next</span>
              </span>
            </button>
          </div>
          <div className="md:pl-8 flex flex-col justify-center gap-8 text-center md:text-left">
            <div className="flex flex-col font-extrabold">
              <p className="inline text-3xl sm:block md:inline text-black">Donate to</p>
              <p className="inline text-3xl sm:block md:inline text-black">support our</p>
              <p className="inline text-3xl sm:block md:inline text-orange-500">cause</p>
            </div>
            <div className="flex flex-col">
              <p className="inline sm:block md:inline">Account holder name : DINA MAULIA</p>
              <p className="inline sm:block md:inline">Account number : 93777928</p>
              <p className="inline sm:block md:inline">Sort code : 20-26-22</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
