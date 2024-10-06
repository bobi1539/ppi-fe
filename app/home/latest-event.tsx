export default function LatestEvent() {
  return (
    <section>
      <div className=" bg-white px-0 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-6 md:grid-cols-5 md:gap-8 md:px-8 md:divide-x-4 md:divide-secondary-700">
          <div className="grid grid-cols-2 md:col-span-3 gap-4">
            <a className="flex-wrap flex-1" href="https://ppiwarwick.org/event/2nd-Pre-Departure-Session-2425">
              <img className="aspect-auto" src="https://ppiwarwick.org/file/event/2nd-Pre-Departure-Session-2425-cover.png" />
            </a>
            <a className="flex-wrap flex-1" href="https://ppiwarwick.org/event/Pre-Departure-Session-2425">
              <img className="aspect-auto" src="https://ppiwarwick.org/file/event/Pre-Departure-Session-2425-cover.png" />
            </a>
          </div>
          <div className="flex flex-row gap-2 text-center justify-between md:text-left md:flex-col text-black md:col-span-2 md:pl-8">
            <p className="inline text-3xl sm:block md:inline xl:block text-black font-extrabold text-right md:text-left w-full">Latest</p>
            <p className="inline text-3xl sm:block md:inline xl:block text-orange-500 font-extrabold text-left w-full">Events</p>
            <div className="p-0 hidden md:flex h-full justify-start items-end -ml-8 -mb-6">
              <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#6d28d9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
