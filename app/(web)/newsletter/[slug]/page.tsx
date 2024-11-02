"use client";

import { useEffect } from "react";

export default function NewsletterDetail({ params }: Readonly<{ params: { slug: string } }>) {
  useEffect(() => {
    console.log("slug : ", params.slug);
  }, []);

  return (
    <section className="bg-white">
      <div className="py-8 px-4 md:py-16 md:px-6 mx-auto max-w-screen-xl ">
        <img src="https://ppiwarwick.org/file/newsletter/Bimonthly-Newsletter-HOPE-2-file.png" alt="..." />
      </div>
    </section>
  );
}
