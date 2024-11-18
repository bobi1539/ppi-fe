"use client";

import { useEffect, useState } from "react";
import ContentTitle from "../components/content-title";
import { DashboardResponse } from "@/app/dto/response/dashboard-response";
import { dashboardGet } from "@/app/backend-api/dashboard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardResponse>();
  const [year, setYear] = useState<string>("2024");

  useEffect(() => {
    dashboardGet(year).then((response) => setDashboard(response));
  }, [year]);

  const getYears = (): string[] => {
    const years: string[] = [];
    let currentYear = new Date().getFullYear();
    for (let i = 1; i <= 5; i++) {
      years.push(currentYear.toString());
      currentYear -= 1;
    }
    return years;
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
        <div className="border-b border-gray-200 mx-12" />
        <div className="grid xl:grid-cols-2 p-4 gap-8 xl:gap-4 my-4">
          <div>
            <div className="flex justify-center items-center mb-4">
              <h1 className="font-bold text-xl">Event</h1>
              <select className="text-gray-900 font-bold text-lg ml-2 px-1 focus:ring-2 focus:ring-secondary-700 focus:border-secondary-700 focus:rounded outline-none" onChange={(e) => setYear(e.target.value)}>
                {getYears().map((option, index) => (
                  <option key={index + 1} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dashboard?.eventPerMonths}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalEvent" fill="#6d28d9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col items-center justify-center border-t border-gray-200 xl:border-white">
            <h1 className="font-bold text-xl xl:-mt-4 mt-4">Student</h1>
            <PieChart width={400} height={400}>
              <Pie dataKey="count" isAnimationActive={false} data={dashboard?.studentEducations} cx="50%" cy="50%" outerRadius={80} fill="#6d28d9" label />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </section>
    </div>
  );
}

interface CardTotalProps {
  total?: number;
  text?: string;
  icon?: string;
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
