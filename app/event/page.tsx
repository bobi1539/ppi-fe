import Link from "next/link";
import { limitText } from "../utils/helper";

export default function Event() {
  const events = [
    {
      id: 1,
      detail: "https://ppiwarwick.org/event/2nd-Pre-Departure-Session-2425",
      image: "https://ppiwarwick.org/file/event/2nd-Pre-Departure-Session-2425-cover.png",
      title: "2nd Pre-Departure Session 24/25",
      date: "28 Jun 2024 (3 months ago)",
      time: "10:00 - 10:00",
      description: "Hi! We are excited to announce our second online pre-departure session about *visa application in c (...)",
    },
    {
      id: 2,
      detail: "https://ppiwarwick.org/event/Pre-Departure-Session-2425",
      image: "https://ppiwarwick.org/file/event/Pre-Departure-Session-2425-cover.png",
      title: "Pre-Departure Session 24/25",
      date: "23 Jun 2024 (3 months ago)",
      time: "07:00 - 09:00",
      description: "Hi everyone! 🎉 We are excited to announce our first online pre-departure session for all incoming (...)",
    },
    {
      id: 3,
      detail: "https://ppiwarwick.org/event/Maritime-Mosaic",
      image: "https://ppiwarwick.org/file/event/Maritime-Mosaic-cover.png",
      title: "Maritime Mosaic",
      date: "17 May 2024 (4 months ago)",
      time: "10:30 - 21:00",
      description: "Warwick Indonesian Society proudly presents, 🌊 Maritime & Mosaic of Indonesia✨🇮🇩 Get ready to sa (...)",
    },
    {
      id: 4,
      detail: "https://ppiwarwick.org/event/Global-Village",
      image: "https://ppiwarwick.org/file/event/Global-Village-cover.png",
      title: "Global Village",
      date: "03 May 2024 (5 months ago)",
      time: "13:00 - 16:00",
      description: "Need a study break? Get the scoop on the exciting societies joining us at “GLOBAL VILLAGE” Indulge (...)",
    },
    {
      id: 5,
      detail: "https://ppiwarwick.org/event/Kumpul-Bareng-Main-Angklung",
      image: "https://ppiwarwick.org/file/event/Kumpul-Bareng-Main-Angklung-cover.png",
      title: "Kumpul Bareng Main Angklung",
      date: "05 May 2024 (5 months ago)",
      time: "13:00 - 18:00",
      description: "Hi guys! Hopefully, term 2 ends very well for all of us ya! Buat istirahat sejenak, mari datang ke (...)",
    },
    {
      id: 6,
      detail: "https://ppiwarwick.org/event/Halal-Bihalal",
      image: "https://ppiwarwick.org/file/event/Halal-Bihalal-cover.png",
      title: "Halal Bihalal",
      date: "13 Apr 2024 (5 months ago)",
      time: "12:00 - 18:00",
      description: "📣 *Halal Bihalal Iedul Fitri 1445 H, KIGC, PPI Warwick, PPI Coventry* _Assalamualaikum Wr. Wb._ B (...)",
    },
    {
      id: 7,
      detail: "https://ppiwarwick.org/event/Belajar-Bareng",
      image: "https://ppiwarwick.org/file/event/Belajar-Bareng-cover.png",
      title: "Belajar Bareng",
      date: "09 Feb 2024 (7 months ago)",
      time: "18:00 - 20:00",
      description: "“Searching academic paper + Academic paper types “ . Hari : Jumat; Tanggal : 2 February 2024; Room (...)",
    },
    {
      id: 8,
      detail: "https://ppiwarwick.org/event/Indonesia-Language-Class",
      image: "https://ppiwarwick.org/file/event/Indonesia-Language-Class-cover.png",
      title: "Indonesia Language Class",
      date: "07 Feb 2024 (8 months ago)",
      time: "16:00 - 18:00",
      description: "📢 Join us for a beginners’ Indonesian language class every Wednesday at 16:00 at FAB 3.33! Expand y (...)",
    },
    {
      id: 9,
      detail: "https://ppiwarwick.org/event/Debar-Debar-Nobar",
      image: "https://ppiwarwick.org/file/event/Debar-Debar-Nobar-cover.png",
      title: "Debar Debar Nobar",
      date: "04 Feb 2024 (8 months ago)",
      time: "11:00 - 18:00",
      description: "DEBAR DEBAR NOBAAAARRR!!! Ok, teman2, sudah jadi kewajiban kita sebagai kawula PPI Warwick untuk se (...)",
    },
    {
      id: 10,
      detail: "https://ppiwarwick.org/event/Potluck-Mabar",
      image: "https://ppiwarwick.org/file/event/Potluck-Mabar-cover.png",
      title: "Potluck: Mabar",
      date: "26 Jan 2024 (8 months ago)",
      time: "17:30 - 20:30",
      description: "Happy new year everyone! Let’s celebrate the new year with PPI Warwick at Mabar: Makan Bareng - New (...)",
    },
    {
      id: 11,
      detail: "https://ppiwarwick.org/event/Serba-serbi-Pemilu-2024-di-Inggris",
      image: "https://ppiwarwick.org/file/event/Serba-serbi-Pemilu-2024-di-Inggris-cover.png",
      title: "Serba-serbi Pemilu 2024 di Inggris",
      date: "28 Dec 2023 (9 months ago)",
      time: "15:00 - 16:00",
      description: "Serba-serbi Pemilu 2024 di Inggris ⚡️ Kamu masih bingung? 🤷🏽‍♂️ Mari bergabung dan berdiskusi m (...)",
    },
    {
      id: 12,
      detail: "https://ppiwarwick.org/event/Nature-Walk-Expedition",
      image: "https://ppiwarwick.org/file/event/Nature-Walk-Expedition-cover.png",
      title: "Nature Walk Expedition",
      date: "06 Dec 2023 (10 months ago)",
      time: "13:00 - 18:00",
      description: "Hellow.. Selamat hari minggu yang dingin, tapi semoga hari kamu tetap hangat. ❄️🤍 Teman-teman PPI (...)",
    },
    {
      id: 13,
      detail: "https://ppiwarwick.org/event/CUPID-101",
      image: "https://ppiwarwick.org/file/event/CUPID-101-cover.png",
      title: "CUPID 101",
      date: "01 Dec 2023 (10 months ago)",
      time: "16:00 - 18:00",
      description: "*CUPID (Curhatan Pelajar Indonesia Warwick-Coventry University)* Are you ready to meet CUPID ANGELS (...)",
    },
    {
      id: 14,
      detail: "https://ppiwarwick.org/event/BadminDong",
      image: "https://ppiwarwick.org/file/event/BadminDong-cover.png",
      title: "BadminDong",
      date: "02 Dec 2023 (10 months ago)",
      time: "10:00 - 17:00",
      description: "Here are our athletes lineup for BadminDong on Saturday, December 2nd in Sir Doug Ellis Woodcock Spo (...)",
    },
    {
      id: 15,
      detail: "https://ppiwarwick.org/event/PPI-Warwick-in-Netflix-and-Cheers",
      image: "https://ppiwarwick.org/file/event/PPI-Warwick-in-Netflix-and-Cheers-cover.png",
      title: "PPI Warwick in: Netflix and Cheers!",
      date: "10 Nov 2023 (10 months ago)",
      time: "17:30 - 21:00",
      description: "Come and celebrate Hari Pahlawan dengan PPI Warwick di: Netflix and Cheers! Jumat, 10 November (...)",
    },
    {
      id: 16,
      detail: "https://ppiwarwick.org/event/Warmindo-Berdendang",
      image: "https://ppiwarwick.org/file/event/Warmindo-Berdendang-cover.png",
      title: "Warmindo Berdendang",
      date: "26 Oct 2023 (11 months ago)",
      time: "17:30 - 19:30",
      description: "Calling all shower singers! Don’t miss the first gathering event presented by PPI Warwick 2023/2024 (...)",
    },
  ];

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:py-16 md:px-6">
        <div className="text-center text-gray-900">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl">Event</h2>
        </div>
        <div className="grid gap-6 mt-12 md:mt-14 md:gap-8 md:grid-cols-4">
          {events.map((event) => (
            <Link key={event.id} href={event.detail}>
              <div className="grid grid-cols-5 md:flex mb-2 md:flex-col md:mb-0 gap-4 md:gap-0">
                <img className="col-span-2 w-auto h-40 md:w-full md:h-72 xl:h-96 rounded-lg" src={event.image} alt="2nd Pre-Departure Session 24/25" />
                <div className="col-span-3">
                  <h3 className="text-xl font-bold md:mt-4  text-gray-900">{event.title}</h3>
                  <p className="text-xs text-gray-500">{event.date}</p>
                  <p className="text-xs mb-2.5 text-gray-500">{event.time}</p>
                  <p className="text-justify text-sm text-gray-800">{limitText(event.description, 100)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
