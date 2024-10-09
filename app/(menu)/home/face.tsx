"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

export default function Face() {
  const faces = [
    {
      id: 0,
      divisionName: "President",
      divisionId: "https://ppiwarwick.org/dept/1",
      photo: "https://ppiwarwick.org/file/staff/2y12rLtLhzelkUVjVpmA0RdA02m2KB8sK5diKZ7p5aRBlMQaWULQHi.png",
      name: "Iqbal Azis Romadhon",
    },
    {
      id: 1,
      divisionName: "Secretary",
      divisionId: "https://ppiwarwick.org/dept/2",
      photo: "https://ppiwarwick.org/file/staff/2y12ZWKPEtRCMmS7PBqS0y19VG7uMeZsDkG7vgMb8IYIgOFbZgUwDe.png",
      name: "Angeline Hartono",
    },
    {
      id: 2,
      divisionName: "Treasurer",
      divisionId: "https://ppiwarwick.org/dept/3",
      photo: "https://ppiwarwick.org/file/staff/2y12VixqqnP6y75yKZ2CfGRReg0DQvWHXkuF6vD4DYl3ADDrLsA5rkq.png",
      name: "Dina Cahya",
    },
    {
      id: 3,
      divisionName: "Digital",
      divisionId: "https://ppiwarwick.org/dept/6",
      photo: "https://ppiwarwick.org/file/staff/2y12yodrhK2SVoDxlSuwkunuDjKCoHZ2AyNUiJXo5o5lSeMpDlwIlV.png",
      name: "Dea Kamila",
    },
    {
      id: 4,
      divisionName: "Fundraising",
      divisionId: "https://ppiwarwick.org/dept/7",
      photo: "https://ppiwarwick.org/file/staff/2y12Xbtd4hwrz7ALfR5pOT6hDvymO0xagyFegCSpE4HynrSxACCu7a.png",
      name: "Cynthia Effendi",
    },
    {
      id: 5,
      divisionName: "Internal",
      divisionId: "https://ppiwarwick.org/dept/4",
      photo: "https://ppiwarwick.org/file/staff/2y126KBwU7FqyR3YAiaWvx9HQOs4BBeaQQCWpyB751RcX1UW6m6B1Qyc6.jpg",
      name: "Aldi Teguh",
    },
    {
      id: 6,
      divisionName: "External",
      divisionId: "https://ppiwarwick.org/dept/5",
      photo: "https://ppiwarwick.org/file/staff/2y12hOLZ3xZsJddiXNPUlUc9pe6ap4K1oEuzmMiiOYqNJdI8yZwwMapW.jpg",
      name: "Asha Aulia",
    },
  ];

  const autoplay = Autoplay({ delay: 3000 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [currentFaceId, setCurrentFaceId] = useState<number>(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = (): void => {
      setCurrentFaceId(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);

    return (): void => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

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
              {faces.map((face) => (
                <div key={face.id} className="min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-1/5 mx-2">
                  <div className="group md:mx-2">
                    <div className="text-center mb-2">
                      <h3 className="text-md text-white font-extrabold">
                        <b>{face.divisionName}</b>
                      </h3>
                    </div>
                    <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
                      <a href={face.divisionId}>
                        <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
                          <img src={face.photo} alt={face.name} className="object-cover object-center w-full h-full md:w-full md:h-full" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            {faces.map((face, index) => (
              <button onClick={() => scrollTo(index)} key={face.id} className={`${index === currentFaceId ? "bg-white" : "bg-white/50"} w-3 h-3 rounded-full`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
