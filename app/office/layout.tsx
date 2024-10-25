"use client";

import { Suspense, useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import { getSessionForClient } from "../login/helper";
import { useRouter } from "next/navigation";
import { FE_LOGIN } from "../constants/endpoint-fe";
import LoadingOffice from "./loading";

export default function OfficeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    validateIsLogin();
  }, []);

  const validateIsLogin = async () => {
    const session = await getSessionForClient();
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
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={handleSidebarClose} />
          <main className="bg-gray-50 md:ml-64 min-h-screen p-4 pt-20">
            <Suspense fallback={<LoadingOffice />}>{children}</Suspense>
          </main>
          <div onClick={handleSidebarOpen} className={`${isSidebarOpen ? "bg-gray-900/50 fixed inset-0 z-30" : ""}`} />
        </div>
      )}
    </>
  );
}
