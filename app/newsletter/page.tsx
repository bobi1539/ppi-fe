import Link from "next/link";
import { limitText } from "../utils/helper";

export default function Newsletter() {
  const newsletters = [
    {
      id: 1,
      detail: "/newsletter/Bimonthly-Newsletter-HOPE-2",
      image: "https://ppiwarwick.org/file/newsletter/Bimonthly-Newsletter-HOPE-2-cover.png",
      title: "Bimonthly Newsletter HOPE #2",
      description: "Hi everyone, We are excited to share the latest edition of the PPI Warwick Newsletter with you! 🥳 (...)",
    },
    {
      id: 2,
      detail: "/newsletter/Bimonthly-Newsletter-HOPE-1",
      image: "https://ppiwarwick.org/file/newsletter/Bimonthly-Newsletter-HOPE-1-cover.png",
      title: "Bimonthly Newsletter HOPE #1",
      description: "Hi everyone, Hope you had a wonderful break and new year! 🥳 Attached below is PPI Warwick's firs (...)",
    },
  ];

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:py-16 md:px-6">
        <div className="text-center text-gray-900">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl">Newsletter</h2>
        </div>
        <div className="grid gap-6 mt-12 md:mt-14 md:gap-12 md:grid-cols-3">
          {newsletters.map((newsletter) => (
            <Link key={newsletter.id} href={newsletter.detail}>
              <div className="flex mb-2 md:flex-col md:mb-0">
                <img className="mr-4 w-auto h-36 md:w-full md:h-auto rounded-lg" src={newsletter.image} alt={newsletter.title} />
                <div>
                  <h3 className="text-xl font-bold md:mt-4 mb-2.5 text-gray-900">{newsletter.title}</h3>
                  <p className="text-sm text-gray-500">{limitText(newsletter.description, 100)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
