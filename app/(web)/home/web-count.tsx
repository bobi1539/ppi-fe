"use client";

import { webEventCountAll } from "@/app/backend-api/event";
import { webNewsletterCountAll } from "@/app/backend-api/newsletter";
import { webStaffCountByPeriod } from "@/app/backend-api/staff";
import { webStudentCountAll } from "@/app/backend-api/student";
import { useEffect, useState } from "react";

interface WebCountData {
  student: number;
  event: number;
  newsletter: number;
  staff: number;
}

export default function WebCount() {
  const [webCountData, setWebCountData] = useState<WebCountData>({
    student: 100,
    event: 0,
    newsletter: 0,
    staff: 0,
  });

  useEffect(() => {
    countData();
  }, []);

  const countData = async (): Promise<void> => {
    const eventCount = await webEventCountAll();
    const newsletterCount = await webNewsletterCountAll();
    const staffCount = await webStaffCountByPeriod(1);
    const studentCount = await webStudentCountAll();

    setWebCountData((prev) => ({
      ...prev,
      event: eventCount,
      newsletter: newsletterCount,
      staff: staffCount,
      student: studentCount,
    }));
  };

  return (
    <section>
      <div className="py-8 sm:py-18 bg-secondary-600">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <dl className="grid gap-x-4 gap-y-4 text-center grid-cols-2 md:grid-cols-4">
            <CountDisplay title="student" count={webCountData.student} />
            <CountDisplay title="event" count={webCountData.event} />
            <CountDisplay title="newsletter" count={webCountData.newsletter} />
            <CountDisplay title="staff" count={webCountData.staff} />
          </dl>
        </div>
      </div>
    </section>
  );
}

interface CountDisplayProps {
  title: string;
  count: number;
}
const CountDisplay = (props: Readonly<CountDisplayProps>) => {
  return (
    <div className="mx-auto flex max-w-xs flex-col gap-y-1">
      <dt className="text-base leading-7 text-white">{props.title}</dt>
      <dd className="order-first text-3xl font-bold tracking-tight text-white sm:text-5xl">{props.count}</dd>
    </div>
  );
};
