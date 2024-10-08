export default function Face() {
  const faces = [
    {
      id: 1,
      divisionName: "President",
      divisionId: "https://ppiwarwick.org/dept/1",
      photo: "https://ppiwarwick.org/file/staff/2y12rLtLhzelkUVjVpmA0RdA02m2KB8sK5diKZ7p5aRBlMQaWULQHi.png",
      name: "Iqbal Azis Romadhon",
    },
    // {
    //   id: 2,
    //   divisionName: "Secretary",
    //   divisionId: "https://ppiwarwick.org/dept/2",
    //   photo: "https://ppiwarwick.org/file/staff/2y12ZWKPEtRCMmS7PBqS0y19VG7uMeZsDkG7vgMb8IYIgOFbZgUwDe.png",
    //   name: "Angeline Hartono",
    // },
    // {
    //   id: 3,
    //   divisionName: "Treasurer",
    //   divisionId: "https://ppiwarwick.org/dept/3",
    //   photo: "https://ppiwarwick.org/file/staff/2y12VixqqnP6y75yKZ2CfGRReg0DQvWHXkuF6vD4DYl3ADDrLsA5rkq.png",
    //   name: "Dina Cahya",
    // },
    // {
    //   id: 4,
    //   divisionName: "Digital",
    //   divisionId: "https://ppiwarwick.org/dept/6",
    //   photo: "https://ppiwarwick.org/file/staff/2y12yodrhK2SVoDxlSuwkunuDjKCoHZ2AyNUiJXo5o5lSeMpDlwIlV.png",
    //   name: "Dea Kamila",
    // },
    // {
    //   id: 5,
    //   divisionName: "Fundraising",
    //   divisionId: "https://ppiwarwick.org/dept/7",
    //   photo: "https://ppiwarwick.org/file/staff/2y12Xbtd4hwrz7ALfR5pOT6hDvymO0xagyFegCSpE4HynrSxACCu7a.png",
    //   name: "Cynthia Effendi",
    // },
    // {
    //   id: 6,
    //   divisionName: "Internal",
    //   divisionId: "https://ppiwarwick.org/dept/4",
    //   photo: "https://ppiwarwick.org/file/staff/2y126KBwU7FqyR3YAiaWvx9HQOs4BBeaQQCWpyB751RcX1UW6m6B1Qyc6.jpg",
    //   name: "Aldi Teguh",
    // },
    // {
    //   id: 7,
    //   divisionName: "External",
    //   divisionId: "https://ppiwarwick.org/dept/5",
    //   photo: "https://ppiwarwick.org/file/staff/2y12hOLZ3xZsJddiXNPUlUc9pe6ap4K1oEuzmMiiOYqNJdI8yZwwMapW.jpg",
    //   name: "Asha Aulia",
    // },
  ];

  return (
    <section>
      <div className="bg-secondary-700 py-8">
        <div className="mb-8 mt-2 px-4 mx-8 md:mx-16 sm:px-6 md:px-8">
          <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-center">
            <p className="inline text-3xl sm:block md:inline text-white font-extrabold">Faces of PPI Warwick</p>
          </h2>
          <ul className="flex">
            {faces.map((face) => (
              <li className="w-full">
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    // <section>
    //   <div className=" bg-secondary-700 px-16 py-8">
    //     <div className="mb-8 mt-2 px-4 mx-8 md:mx-16 sm:px-6 lg:px-8">
    //       <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-center" data-aos="fade-left" data-aos-delay={1000}>
    //         <p className="inline text-3xl sm:block lg:inline xl:block text-white font-extrabold">Faces of PPI Warwick</p>
    //       </h2>
    //       <div className="lSSlideOuter ">
    //         <div
    //           className="lSSlideWrapper usingCss"
    //           style={{
    //             transitionDuration: "600ms",
    //             transitionTimingFunction: "ease",
    //           }}
    //         >
    //           <ul
    //             id="dev-light-slider"
    //             data-aos="fade-up"
    //             data-aos-delay={450}
    //             className="lightSlider lSSlide"
    //             style={{
    //               width: 2952,
    //               height: 390,
    //               paddingBottom: "0%",
    //               transform: "translate3d(-984px, 0px, 0px)",
    //             }}
    //           >
    //             <li className="clone left" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>External</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/5">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12hOLZ3xZsJddiXNPUlUc9pe6ap4K1oEuzmMiiOYqNJdI8yZwwMapW.jpg" alt="Asha Aulia" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="lslide" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>President</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/1">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12rLtLhzelkUVjVpmA0RdA02m2KB8sK5diKZ7p5aRBlMQaWULQHi.png" alt="Iqbal Azis Romadhon" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="lslide" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>Secretary</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/2">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12ZWKPEtRCMmS7PBqS0y19VG7uMeZsDkG7vgMb8IYIgOFbZgUwDe.png" alt="Angeline Hartono" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="lslide active" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>Treasurer</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/3">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12VixqqnP6y75yKZ2CfGRReg0DQvWHXkuF6vD4DYl3ADDrLsA5rkq.png" alt="Dina Cahya" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="lslide" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>Digital</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/6">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12yodrhK2SVoDxlSuwkunuDjKCoHZ2AyNUiJXo5o5lSeMpDlwIlV.png" alt="Dea Kamila" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="lslide" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>Fundraising</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/7">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12Xbtd4hwrz7ALfR5pOT6hDvymO0xagyFegCSpE4HynrSxACCu7a.png" alt="Cynthia Effendi" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="lslide" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>Internal</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/4">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y126KBwU7FqyR3YAiaWvx9HQOs4BBeaQQCWpyB751RcX1UW6m6B1Qyc6.jpg" alt="Aldi Teguh" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="lslide" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>External</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/5">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12hOLZ3xZsJddiXNPUlUc9pe6ap4K1oEuzmMiiOYqNJdI8yZwwMapW.jpg" alt="Asha Aulia" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="clone right" style={{ width: 318, marginRight: 10 }}>
    //               <div className="group md:mx-2">
    //                 <div className="text-center mb-2">
    //                   <h3 className="text-md text-white font-extrabold">
    //                     <b>President</b>
    //                   </h3>
    //                 </div>
    //                 <div className="bg-secondary-300 px-2 pt-2 pb-12 rounded-2xl text-center items-center justify-center">
    //                   <a href="https://ppiwarwick.org/dept/1">
    //                     <div className=" w-full overflow-hidden bg-gray-200 rounded-xl aspect-square group-hover:opacity-75 border-1 border-black">
    //                       <img src="https://ppiwarwick.org/file/staff/2y12rLtLhzelkUVjVpmA0RdA02m2KB8sK5diKZ7p5aRBlMQaWULQHi.png" alt="Iqbal Azis Romadhon" className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //           </ul>
    //           <div className="lSAction">
    //             <a className="lSPrev" />
    //             <a className="lSNext" />
    //           </div>
    //         </div>
    //         {/* <ul className="lSPager lSpg" style={{ marginTop: 5 }}>
    //           <li className="">
    //             <a href="#">1</a>
    //           </li>
    //           <li className="">
    //             <a href="#">2</a>
    //           </li>
    //           <li className="active">
    //             <a href="#">3</a>
    //           </li>
    //           <li>
    //             <a href="#">4</a>
    //           </li>
    //           <li>
    //             <a href="#">5</a>
    //           </li>
    //           <li>
    //             <a href="#">6</a>
    //           </li>
    //           <li>
    //             <a href="#">7</a>
    //           </li>
    //         </ul> */}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
