"use client";

import Link from "next/link";
import { FE_DASHBOARD, FE_LOGIN } from "@/app/constants/endpoint-fe";
import { useState } from "react";
import { logout } from "@/app/login/helper";
import { useRouter } from "next/navigation";
import { showConfirmDialog } from "@/app/utils/sweet-alert";

interface TopbarProps {
  setIsSidebarOpen: () => void;
}

export default function Topbar(props: Readonly<TopbarProps>) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    const result = await showConfirmDialog("Are you sure to logout ?");
    if (result.isConfirmed) {
      await logout();
      router.push(FE_LOGIN);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <button onClick={props.setIsSidebarOpen} className="p-2 mr-2 rounded-lg cursor-pointer md:hidden text-secondary-700 hover:text-secondary-600 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100">
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
            <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <Link href={FE_DASHBOARD} className="flex items-center">
            <img src="https://ppiwarwick.org/logo.png" className="mr-3 h-6 sm:h-9" alt="PPIW Logo" />
            <span className="hidden md:block self-center text-secondary-800 text-xl font-semibold whitespace-nowrap">PPI Warwick</span>
          </Link>
        </div>
        <div className="flex items-center">
          <button type="button" className="p-2 mr-1 text-secondary-700 rounded-lg hover:text-secondary-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
            <span className="sr-only">View notifications</span>
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button type="button" className="p-2 text-secondary-700 rounded-lg hover:text-secondary-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
            <span className="sr-only">View notifications</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} type="button" className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png" alt="..." />
          </button>
          <div className={`${isUserMenuOpen ? "" : "hidden"} absolute top-0 right-0 mt-16 z-50 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow rounded-xl`}>
            <div className="py-3 px-4">
              <span className="block text-sm font-semibold text-gray-900">Admin</span>
              <span className="block text-sm text-gray-900 truncate">admin@ppi-warwick.org</span>
            </div>
            <ul className="py-1 text-gray-700">
              <li>
                <Link href="#" className="block py-2 px-4 text-sm text-gray-700 hover:text-white hover:bg-secondary-700 transition ease-in duration-200">
                  My profile
                </Link>
              </li>
            </ul>
            <ul className="py-1 text-gray-700">
              <li>
                <Link onClick={handleLogout} href="#" className="block py-2 px-4 text-sm text-gray-700 hover:text-white hover:bg-secondary-700 transition ease-in duration-200">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
