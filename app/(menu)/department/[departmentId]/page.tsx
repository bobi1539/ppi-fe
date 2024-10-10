"use client";

import React, { useEffect } from "react";

export default function DepartmentDetail({ params }: Readonly<{ params: { departmentId: number } }>) {
  useEffect(() => {
    console.log("id : ", params.departmentId);
  }, []);

  const teams = [
    {
      id: 1,
      name: "Wennie",
      position: "Website Lead",
      photo: "https://ppiwarwick.org/file/staff/2y12hNkgAGGkJcAm0Iz2UJu2CedWm73ulCYuqFuN1Yk5WEJRwLxvX.jpg",
      desc: "Wennie has been appointed as the Website Lead for PPI Warwick. She brings with her five years of experience working in manufacturing, particularly in logistics and accounting departments. She has also been involved with various organizations such as Data Science Indonesia and Yayasan Anak Bangsa Bisa, where she worked on data-related projects. \n \n Currently, Wennie is pursuing an MSc in Business Analytics.",
    },
    {
      id: 2,
      name: "Shinta",
      position: "Social Media Lead - Instagram",
      photo: "https://ppiwarwick.org/file/staff/2y12Q8k351SJllJhToyBRBxleGDmuETWxdnVFEVw7k9q1I7dgm9uRzNa.jpg",
      desc: "Shinta is the newly appointed Social Media Lead for PPI’s Warwick Instagram. Prior to her study, she worked as an interior designer managing a variety of projects, including residential and commercial spaces \n \n Shinta is currently pursuing a MSc in Management at the University of Warwick with a mission of enlarging SME’s industry in Indonesia.",
    },
    {
      id: 3,
      name: "Raihan Syarief",
      position: "Social Media Lead - Youtube",
      photo: "https://ppiwarwick.org/file/staff/2y12XV7n3VrsllQHUtt2LYlBeOvivlCkujYLl0vvQuJ9MDF31K1gMK.jpg",
      desc: "Raihan Syarief (Rehan) is responsible for PPI Warwick’s YouTube channel. He is a four-year experienced hustler in the creative industry backstage as a copywriter, planner, producer, scriptwriter, and even amateur TVC talent. \n \n Funded by LPDP, he is now studying for an MA in Digital Media and Culture at CIM Warwick.",
    },
  ];

  const nl2br = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index + 1}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:py-16 md:px-6">
        <div className="text-center text-gray-900">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl">Digital | Kabinet HOPE</h2>
        </div>
        <div className="flex flex-col gap-6 mt-8 md:mt-12">
          <div className="w-full grid md:grid-cols-2 gap-4">
            <div className="col-span-1 h-full flex-1">
              <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-6">
                <div className="flex flex-col items-center text-gray-900">
                  <img className="w-24 h-24 aspect-square mb-3 rounded-full shadow-lg mt-4" src="https://ppiwarwick.org/file/staff/2y12yodrhK2SVoDxlSuwkunuDjKCoHZ2AyNUiJXo5o5lSeMpDlwIlV.png" alt="..." />
                  <h5 className="mb-1 text-2xl font-bold">Dea Kamila</h5>
                  <h3 className="mb-1 text-xl font-medium">Head of Digital</h3>
                  <p className="font-normal text-gray-900 text-justify mb-4">
                    Dea Kamila (Dea) is a head of Website Lead and Social Media and Content Lead. She has 3 years of experience working in startup companies and agencies as a Visual Artist. She is skilled in 3D Art, Motion Graphic, and Graphic design.
                    <br />
                    <br />
                    She is currently studying MA in Creative and Media Enterprises.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 col-span-1 h-full flex-1">
              <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <p className="text-black font-bold">“Dea plays Valorant and peaked in Ascendant 2”</p>
              </div>
              <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <p className="font-normal text-gray-700">
                  <b>Funfact: </b>A gymrat and is a part time content creator and streamer!
                </p>
              </div>
              <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <p>
                  <b>Responsibility :</b>
                </p>
                <p className="font-normal text-gray-700">
                  - Reports to President
                  <br />
                  - Making sure the digital project management is well-planned and prepared for social media (Instagram, YouTube, TikTok, and FaceBook) and content,
                  <br />
                  - Overseeing website making process as transparency platform as a summary to all PPI activities,
                  <br />- Work with external partners for all digital necessities.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-900">
            <h2 className="mb-4 mt-8 text-2xl tracking-tight font-extrabold text-gray-900 md:text-4xl">The Teams</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team.id} className="w-full bg-white border border-gray-200 rounded-lg shadow p-4">
                <div className="flex flex-col items-center text-gray-900">
                  <img className="w-24 h-24 aspect-square mb-3 rounded-full shadow-lg mt-4" src={team.photo} alt="..." />
                  <h5 className="mb-1 text-2xl font-bold">{team.name}</h5>
                  <h3 className="mb-2 text-xl font-medium text-center">{team.position}</h3>
                  <p className="font-normal text-gray-900 text-justify mb-4">{nl2br(team.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
