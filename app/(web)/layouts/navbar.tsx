"use client";

import { fileDownload } from "@/app/backend-api/file";
import { DIRECTORY_SETTING } from "@/app/constants/constant";
import { FE_WEB_EVENT, FE_WEB_NEWSLETTER } from "@/app/constants/endpoint-fe";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  urlLogo: string;
}

export default function Navbar(props: Readonly<NavbarProps>) {
  const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(true);

  const handleNavbarHidden = () => {
    setIsNavbarHidden(!isNavbarHidden);
  };

  const navbarMenus = [
    {
      id: 1,
      url: "/",
      name: "Home",
    },
    {
      id: 2,
      url: FE_WEB_EVENT,
      name: "Event",
    },
    {
      id: 3,
      url: FE_WEB_NEWSLETTER,
      name: "Newsletter",
    },
  ];

  const pathName = usePathname();

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 md:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image key={"logo"} className="mr-3 w-auto h-6 sm:h-9" src={fileDownload(DIRECTORY_SETTING, props.urlLogo)} alt="PPI Warwick Logo" width={100} height={36} priority />
            <span className="self-center text-secondary-800 text-xl font-semibold whitespace-nowrap">PPI Warwick</span>
          </Link>
          <div className="flex items-center md:order-2">
            <button onClick={handleNavbarHidden} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className={`${isNavbarHidden ? "hidden" : ""} justify-between items-center w-full md:flex md:w-auto md:order-1 md:-ml-32`} id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
              {navbarMenus.map((menu) => {
                const isActive = pathName === menu.url || pathName.startsWith(menu.url + "/");

                return (
                  <li key={menu.id}>
                    <Link href={menu.url} onClick={handleNavbarHidden} className={`${isActive ? "text-white bg-secondary-700 md:text-secondary-700 md:bg-transparent rounded" : "text-gray-700"} block py-2 pr-4 pl-3  border-b border-gray-100 hover:text-white hover:bg-secondary-700 hover:rounded md:hover:bg-transparent md:border-0 md:hover:text-secondary-700 md:p-0`}>
                      {menu.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
