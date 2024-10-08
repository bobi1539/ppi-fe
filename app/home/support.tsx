"use client";

import { useState } from "react";

export default function Support() {
  const images = [
    {
      id: 1,
      url: "https://ppiwarwick.org/file/event/2y12klVoUdNMFl1OjwUEsBTGKd6LVOBSGRTUQIpal0TjRCQIpJRv26S.png",
      isActive: false,
      translate: "translate-x-full",
    },
    {
      id: 2,
      url: "https://ppiwarwick.org/file/event/2y12HiHXRYrl3uu3xiUGOOGPqOOL57oBBEOfRPWGUXDkH14caASdm.png",
      isActive: true,
      translate: "translate-x-full",
    },
    {
      id: 3,
      url: "https://ppiwarwick.org/file/event/2y12Go8CyTdPQenOW4z6KS6glOjpIa5RX9JpnJXvzxsolilnTZefDDd6.png",
      isActive: false,
      translate: "translate-x-full",
    },
    {
      id: 4,
      url: "https://ppiwarwick.org/file/event/2y127Hu1vWtp176Ez9bS8weqEOzJMd3Iylp4bVKz9yOJsLJpAZsw2YFW.png",
      isActive: false,
      translate: "translate-x-full",
    },
    {
      id: 5,
      url: "https://ppiwarwick.org/file/event/2y127RHatjDNri12RUguslRYUeXVtVnxLogPkMM1mCBVA7Faa2ONgbFy.png",
      isActive: false,
      translate: "translate-x-full",
    },
  ];

  const [current, setCurrent] = useState<number>(1);
  const [prev, setPrev] = useState<number>(0);

  const previousSlide = () => {
    if (current === 1) {
      setCurrent(images.length);
      setPrev(images.length - 1);
    } else {
      setCurrent(current - 1);
      setPrev(prev - 1);
    }
  };

  const nextSlide = () => {
    if (current === images.length) {
      setCurrent(1);
      setPrev(0);
    } else {
      setCurrent(current + 1);
      setPrev(prev + 1);
    }
  };

  const setCurrentAndPrev = (imageId: number) => {
    setCurrent(imageId);
    setPrev(imageId - 1);
  };

  return (
    <section>
      <div className=" bg-tertiary-100 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-24 px-6 md:grid-cols-2 md:px-8">
          <div className="relative">
            <div className="overflow-hidden relative rounded-lg h-56 md:h-96">
              {images.map((image) => {
                const translateClass = (): string => {
                  if (current === image.id) {
                    return "translate-x-0";
                  }
                  if (prev == image.id) {
                    return "-translate-x-full";
                  }
                  return "translate-x-full";
                };

                return (
                  <div key={image.id} className={`duration-700 ease-in-out absolute inset-0 transition-transform transform ${translateClass()}`}>
                    <img src={image.url} className="rounded-xl block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." />
                  </div>
                );
              })}
            </div>
            <div className="flex absolute bottom-8 left-1/2 z-30 space-x-3 -translate-x-1/2">
              {images.map((image) => (
                <button key={image.id} onClick={() => setCurrentAndPrev(image.id)} type="button" className={`w-3 h-3 rounded-full hover:bg-white ${current === image.id ? "bg-white" : "bg-white/50"}`} />
              ))}
            </div>
            <button onClick={previousSlide} type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev="">
              <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden">Previous</span>
              </span>
            </button>
            <button onClick={nextSlide} type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next="">
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
