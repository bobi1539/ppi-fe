"use client";

import React, { useEffect, useState } from "react";
import ContentSearch from "../components/content-search";
import ContentTitle from "../components/content-title";
import InputSearch from "../components/input-search";
import { MenuResponse } from "@/app/dto/response/menu-response";
import { menuFindAll } from "@/app/backend-api/menu";
import CustomTable from "@/app/components/table/custom-table";
import MenuModalUpdate from "./menu-update";
import SubMenuModalUpdate from "./sub-menu-update";
import CustomDropdown from "@/app/components/dropdown/custom-dropdown";
import CustomDropdownItem from "@/app/components/dropdown/custom-dropdown-item";
import { ICON_EDIT, TEXT_COLOR_EDIT, TEXT_EDIT } from "@/app/constants/constant";

export default function Menu() {
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [isModalUpdateMenuOpen, setIsModalUpdateMenuOpen] = useState<boolean>(false);
  const [isModalUpdateSubMenuOpen, setIsModalUpdateSubMenuOpen] = useState<boolean>(false);
  const [menuIdUpdate, setMenuIdUpdate] = useState<number>(0);
  const [subMenuIdUpdate, setSubMenuIdUpdate] = useState<number>(0);
  const [menuName, setMenuName] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    fetchMenu();
  }, [searchValue]);

  const fetchMenu = async (): Promise<void> => {
    const response = await menuFindAll({ search: searchValue });
    setMenus(response);
  };

  const handleEditMenu = (id: number): void => {
    setIsModalUpdateMenuOpen(!isModalUpdateMenuOpen);
    setMenuIdUpdate(id);
  };

  const viewDropDownMenu = (menuId: number): React.ReactNode => {
    return (
      <CustomDropdown>
        <CustomDropdownItem onClick={() => handleEditMenu(menuId)} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />
      </CustomDropdown>
    );
  };

  const handleEditSubMenu = (id: number, menuNameParam: string): void => {
    setMenuName(menuNameParam);
    setIsModalUpdateSubMenuOpen(!isModalUpdateSubMenuOpen);
    setSubMenuIdUpdate(id);
  };

  const viewDropDownSubMenu = (subMenuId: number, menuNameParam: string): React.ReactNode => {
    return (
      <CustomDropdown>
        <CustomDropdownItem onClick={() => handleEditSubMenu(subMenuId, menuNameParam)} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />
      </CustomDropdown>
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
              <React.Fragment key={menu.id}>
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
                        {viewDropDownSubMenu(subMenu.id, menu.name)}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ));
          })()}
        </CustomTable>
        <div className="mb-10" />
        {isModalUpdateMenuOpen && <MenuModalUpdate id={menuIdUpdate} closeModal={() => setIsModalUpdateMenuOpen(false)} fetchMenu={fetchMenu} />}
        {isModalUpdateSubMenuOpen && <SubMenuModalUpdate id={subMenuIdUpdate} menuName={menuName} closeModal={() => setIsModalUpdateSubMenuOpen(false)} fetchMenu={fetchMenu} />}
      </section>
    </div>
  );
}
