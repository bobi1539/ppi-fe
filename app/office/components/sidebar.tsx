"use client";

import { findByHeader } from "@/app/backend-api/user-role-menu";
import { MenuResponse } from "@/app/dto/response/menu-response";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: () => void;
}

export default function Sidebar(props: Readonly<SidebarProps>) {
  const pathName = usePathname();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<{ [key: number]: boolean }>({});
  const [menus, setMenus] = useState<MenuResponse[]>([]);

  const handleSubMenuOpen = (menuId: number): void => {
    setIsSubMenuOpen((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  useEffect(() => {
    fetchUserRoleMenu();
  }, []);

  const fetchUserRoleMenu = async (): Promise<void> => {
    const response = await findByHeader();
    setMenus(response.menus);
  };

  return (
    <aside className={`${props.isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 md:translate-x-0`}>
      <div className="overflow-y-auto py-5 px-3 h-full bg-white">
        <ul className="mt-1 pt-2 space-y-1 border-t border-gray-200">
          {menus.map((menu) => (
            <li key={menu.id}>
              {menu.subMenus && menu.subMenus.length === 0 ? (
                <Link onClick={props.setIsSidebarOpen} href={menu.route} className={`${pathName.startsWith(menu.route) ? "text-white bg-secondary-700" : "text-secondary-700"} flex items-center gap-3 p-2 text-base rounded-lg font-medium transition duration-200 hover:text-white hover:bg-secondary-700`}>
                  <span className="w-7 h-7 flex justify-center items-center">
                    <i className={`${menu.icon} fa-lg`} />
                  </span>
                  <span className="whitespace-nowrap">{menu.name}</span>
                </Link>
              ) : (
                <div>
                  <button onClick={() => handleSubMenuOpen(menu.id)} type="button" className="flex justify-between items-center p-2 w-full text-base rounded-lg font-medium transition duration-200 text-secondary-700 hover:text-white hover:bg-secondary-700">
                    <span className="flex justify-center items-center gap-3">
                      <span className="w-7 h-7 flex justify-center items-center">
                        <i className={`${menu.icon} fa-lg`} />
                      </span>
                      <span className="whitespace-nowrap">{menu.name}</span>
                    </span>
                    <i className={`fa-solid fa-chevron-down ${isSubMenuOpen[menu.id] ? "rotate-180" : ""} mr-2 transition-transform duration-500`} />
                  </button>
                  {isSubMenuOpen[menu.id] && (
                    <ul className="py-2 space-y-2">
                      {menu.subMenus.map((subMenu) => (
                        <li key={subMenu.id}>
                          <Link onClick={props.setIsSidebarOpen} href={subMenu.route} className={`${pathName.startsWith(subMenu.route) ? "text-white bg-secondary-700" : "text-secondary-700"} flex items-center p-2 pl-12 w-full text-base rounded-lg font-medium transition duration-200 hover:text-white hover:bg-secondary-700`}>
                            {subMenu.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
