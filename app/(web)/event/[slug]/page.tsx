"use client";

import { useEffect } from "react";

export default function EventDetail({ params }: Readonly<{ params: { slug: string } }>) {
  useEffect(() => {
    console.log("slug : ", params.slug);
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto py-4 px-4 md:py-16 md:max-w-7xl md:px-8">
        <div className="md:grid md:grid-cols-3 md:grid-rows-1 md:gap-x-8 md:gap-y-10 xl:gap-x-16">
          <div className="md:col-span-1 md:row-end-1">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg ">
              <img src="https://ppiwarwick.org/file/event/2nd-Pre-Departure-Session-2425-cover.png" alt="2nd Pre-Departure Session 24/25" className="object-cover object-center" data-aos="fade-left" data-aos-delay={250} />
            </div>
          </div>
          <div className="mt-4 max-w-2xl sm:mt-16 md:col-span-2 md:row-span-2 md:row-end-2 md:mt-0 md:max-w-none">
            <div className="flex flex-col-reverse">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex flex-row gap-2">2nd Pre-Departure Session 24/25</h1>
                <h2 id="information-heading" className="sr-only">
                  Tanggal
                </h2>
                <p className="text-sm text-gray-500">28 Jun 2024</p>
                <h2 id="information-heading" className="sr-only">
                  Waktu
                </h2>
                <p className="text-sm text-gray-500">10:00 - 10:00</p>
                <h2 id="information-heading" className="sr-only">
                  Description
                </h2>
                <p className="mt-2 text-justify text-md text-black">
                  Hi!
                  <br />
                  <br />
                  We are excited to announce our second online pre-departure session about *visa application in collaboration with IDP*.
                  <br />
                  <br />
                  🗓 *Date: Friday, June 28th 2024*
                  <br />
                  🕒 *Time: 16.00 WIB or 10 AM BST*
                  <br />
                  💻 *Platform: Online via Teams*
                  <br />
                  🎤 *Guest Speaker: Mimi Hamida, Senior Counsellor at IDP*
                  <br />
                  <br />
                  Please make sure to RSVP again through the following link to confirm your attendance:
                  <br />
                  👉 *https://bit.ly/rsvppredeparture2nd*
                  <br />
                  <br />
                  PS: Mba Mimi can also help not only you but also your dependant’s visa application! So make sure to join us and get all the information you need!
                  <br />
                  <br />
                  Looking forward to seeing you all there! 😊
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
