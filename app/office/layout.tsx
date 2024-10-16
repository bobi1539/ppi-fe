"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import { getSession } from "../login/helper";
import { useRouter } from "next/navigation";
import { FE_LOGIN } from "../constants/endpoint-fe";

export default function OfficeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    validateIsLogin();
  }, []);

  const validateIsLogin = async () => {
    const session = await getSession();
    setIsLogin(session.isLoggedIn);
    if (!session.isLoggedIn) {
      router.push(FE_LOGIN);
    }
  };

  return (
    <>
      {isLogin && (
        <div>
          <Topbar setIsSidebarOpen={handleSidebarOpen} />
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <main className="md:ml-64 min-h-screen p-4 pt-20">{children}</main>
          <div onClick={handleSidebarOpen} className={`${isSidebarOpen ? "bg-gray-900/50 fixed inset-0 z-30" : ""}`} />
        </div>
      )}
    </>
  );
}
