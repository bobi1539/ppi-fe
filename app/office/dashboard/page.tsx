"use client";

import { useEffect, useState } from "react";
import ContentTitle from "../components/content-title";
import { DashboardResponse } from "@/app/dto/response/dashboard-response";
import { dashboardGet } from "@/app/backend-api/dashboard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardResponse>();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async (): Promise<void> => {
    const response = await dashboardGet();
    setDashboard(response);
  };

  return (
    <div>
      <ContentTitle title="Dashboard" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 p-12 gap-4 md:gap-12">
          <CardTotal total={dashboard?.totalStudent} text="Student" icon="fa-solid fa-user-group" />
          <CardTotal total={dashboard?.totalEvent} text="Event" icon="fa-solid fa-calendar-week" />
          <CardTotal total={dashboard?.totalNewsletter} text="Newsletter" icon="fa-solid fa-newspaper" />
          <CardTotal total={dashboard?.totalGallery} text="Gallery" icon="fa-solid fa-image" />
        </div>
      </section>
    </div>
  );
}

interface CardTotalProps {
  total?: number;
  text?: string;
  icon?:string;
}

const CardTotal = (props: Readonly<CardTotalProps>) => {
  return (
    <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl text-gray-700">{props.total ?? 0}</h1>
        <h1 className="font-normal text-lg text-gray-500">{props.text ?? ""}</h1>
      </div>
      <div className="flex items-center justify-center bg-secondary-700 rounded-r-lg py-14">
        <i className={`${props.icon} fa-2xl text-white`} />
      </div>
    </div>
  );
};
