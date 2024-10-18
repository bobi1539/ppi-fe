"use client";

import { useEffect, useState } from "react";
import ContentSearch from "../components/content-search";
import ContentTitle from "../components/content-title";
import InputSearch from "../components/input-search";
import { PageResponse } from "@/app/dto/response/page-response";
import { MenuResponse } from "@/app/dto/response/menu-response";
import { SearchDto } from "@/app/dto/search/search-dto";
import { CONSTANT_PAGE_SIZE_VALUE } from "@/app/constants/constant";
import { menuFindAllPagination } from "@/app/backend-api/menu";
import CustomTable, { handleDropDownAction } from "@/app/components/table/custom-table";
import FooterTable from "@/app/components/table/footer-table";
import ButtonDropdown from "@/app/components/button/button-dropdown";

export default function Menu() {
  const [menuPages, setMenuPages] = useState<PageResponse<MenuResponse>>();
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [menuIdUpdate, setMenuIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDropDownTableOpen, setIsDropDownTableOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchMenu();
  }, [currentPage, searchValue]);

  const fetchMenu = async (): Promise<void> => {
    const response = await menuFindAllPagination(buildSearchDto());
    setMenuPages(response);
  };

  const buildSearchDto = (): SearchDto => {
    return {
      search: searchValue,
      page: currentPage,
      size: CONSTANT_PAGE_SIZE_VALUE,
    };
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleDropDownTableOpen = (id: number): void => {
    handleDropDownAction(id, setIsDropDownTableOpen);
  };

  const handleEditMenu = (id: number): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setMenuIdUpdate(id);
    handleDropDownTableOpen(id);
  };

  const headsTable = ["seq", "name", "route", "icon", "seq", ""];

  return (
    <div>
      <ContentTitle title="Menu" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
        </ContentSearch>
        <CustomTable heads={headsTable}>
          {menuPages?.content.map((menu, index) => (
            <tr key={menu.id} className="border-b text-center">
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {currentPage * CONSTANT_PAGE_SIZE_VALUE + index + 1}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {menu.name}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {menu.route}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                <i className={menu.icon} />
              </td>
              <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                {menu.sequence}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                <button onClick={() => handleDropDownTableOpen(menu.id)} className="w-7 h-7 p-4 inline-flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg" type="button">
                  <i className="fa-solid fa-ellipsis fa-lg" />
                </button>
                <div className="absolute">
                  <div className={`${isDropDownTableOpen[menu.id] ? "" : "hidden"} absolute mt-3 z-50 w-44 bg-white rounded shadow py-1 -left-32 md:-left-28 xl:-left-10`}>
                    <ul className="divide-y divide-gray-100">
                      <li>
                        <ButtonDropdown onClick={() => handleEditMenu(menu.id)} text="Edit" icon="fa-solid fa-pen-to-square" />
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </CustomTable>
        <FooterTable numberOfElements={menuPages?.numberOfElements ?? 0} totalElements={menuPages?.totalElements ?? 0} totalPages={menuPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
