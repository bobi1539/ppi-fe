"use client";

import { useEffect, useState } from "react";
import ContentSearch from "../components/content-search";
import ContentTitle from "../components/content-title";
import InputSearch from "../components/input-search";
import { MenuResponse } from "@/app/dto/response/menu-response";
import { menuFindAll } from "@/app/backend-api/menu";
import CustomTable, { handleDropDownAction } from "@/app/components/table/custom-table";
import ButtonDropdown from "@/app/components/button/button-dropdown";

export default function Menu() {
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [menuIdUpdate, setMenuIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<{ [key: number]: boolean }>({});
  const [isDropDownSubMenuOpen, setIsDropDownSubMenuOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchMenu();
  }, [searchValue]);

  const fetchMenu = async (): Promise<void> => {
    const response = await menuFindAll({ search: searchValue });
    setMenus(response);
  };

  const handleDropDownMenuOpen = (id: number): void => {
    handleDropDownAction(id, setIsDropDownMenuOpen);
    handleDropDownAction(-1, setIsDropDownSubMenuOpen);
  };

  const handleDropDownSubMenuOpen = (id: number): void => {
    handleDropDownAction(id, setIsDropDownSubMenuOpen);
    handleDropDownAction(-1, setIsDropDownMenuOpen);
  };

  const handleEditMenu = (id: number): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setMenuIdUpdate(id);
    handleDropDownMenuOpen(id);
  };

  const viewDropDownMenu = (menuId: number): React.ReactNode => {
    return (
      <>
        <button onClick={() => handleDropDownMenuOpen(menuId)} className="w-7 h-7 p-4 inline-flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg" type="button">
          <i className="fa-solid fa-ellipsis fa-lg" />
        </button>
        <div className="absolute">
          <div className={`${isDropDownMenuOpen[menuId] ? "" : "hidden"} absolute mt-3 z-50 w-44 bg-white rounded shadow py-1 -left-32 md:-left-28 xl:-left-10`}>
            <ul className="divide-y divide-gray-100">
              <li>
                <ButtonDropdown onClick={() => handleEditMenu(menuId)} text="Edit" icon="fa-solid fa-pen-to-square" />
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const handleEditSubMenu = (id: number): void => {
    handleDropDownSubMenuOpen(id);
  };

  const viewDropDownSubMenu = (subMenuId: number): React.ReactNode => {
    return (
      <>
        <button onClick={() => handleDropDownSubMenuOpen(subMenuId)} className="w-7 h-7 p-4 inline-flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg" type="button">
          <i className="fa-solid fa-ellipsis fa-lg" />
        </button>
        <div className="absolute">
          <div className={`${isDropDownSubMenuOpen[subMenuId] ? "" : "hidden"} absolute mt-3 z-50 w-44 bg-white rounded shadow py-1 -left-32 md:-left-28 xl:-left-10`}>
            <ul className="divide-y divide-gray-100">
              <li>
                <ButtonDropdown onClick={() => handleEditSubMenu(subMenuId)} text="Edit" icon="fa-solid fa-pen-to-square" />
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const headsTable = ["seq", "name", "route", "icon", "menu seq", "submenu seq", ""];

  return (
    <div>
      <ContentTitle title="Menu" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
        </ContentSearch>
        <CustomTable heads={headsTable}>
          {(() => {
            let numbering = 1;
            return menus.map((menu) => (
              <>
                <tr className="border-b text-center">
                  <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                    {numbering++}
                  </td>
                  <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                    {menu.name}
                  </td>
                  <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                    {menu.route}
                  </td>
                  <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                    <i className={`${menu.icon} fa-lg`} />
                  </td>
                  <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                    {menu.sequence}
                  </td>
                  <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap" />
                  <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                    {viewDropDownMenu(menu.id)}
                  </td>
                </tr>
                {menu.subMenus &&
                  menu.subMenus.length > 0 &&
                  menu.subMenus.map((subMenu) => (
                    <tr key={subMenu.id} className="border-b text-center">
                      <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                        {numbering++}
                      </td>
                      <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                        -- {subMenu.name}
                      </td>
                      <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                        {subMenu.route}
                      </td>
                      <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap" />
                      <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap" />
                      <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                        {subMenu.sequence}
                      </td>
                      <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                        {viewDropDownSubMenu(subMenu.id)}
                      </td>
                    </tr>
                  ))}
              </>
            ));
          })()}
        </CustomTable>
        <div className="mb-10" />
      </section>
    </div>
  );
}
