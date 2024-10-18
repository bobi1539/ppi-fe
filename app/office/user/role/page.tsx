"use client";

import { useEffect, useState } from "react";
import ButtonIcon from "../../../components/button/button-icon";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { userRoleDelete, userRoleFindAllPagination, userRoleRestore } from "@/app/backend-api/user-role";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import { SearchDto } from "@/app/dto/search/search-dto";
import { PageResponse } from "@/app/dto/response/page-response";
import { CONSTANT_PAGE_SIZE_VALUE } from "@/app/constants/constant";
import ButtonDropdown from "@/app/components/button/button-dropdown";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import UserRoleModalCreate from "./create";
import UserRoleModalUpdate from "./update";
import CustomTable, { handleDropDownAction } from "@/app/components/table/custom-table";
import FooterTable from "@/app/components/table/footer-table";

export default function UserRole() {
  const [userRolePages, setUserRolePages] = useState<PageResponse<UserRoleResponse>>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [userRoleIdUpdate, setUserRoleIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDropDownTableOpen, setIsDropDownTableOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchUserRole();
  }, [currentPage, searchValue]);

  const fetchUserRole = async (): Promise<void> => {
    const response = await userRoleFindAllPagination(buildSearchDto());
    setUserRolePages(response);
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

  const handleEditUserRole = (id: number): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setUserRoleIdUpdate(id);
    handleDropDownTableOpen(id);
  };

  const handleDeleteUserRole = async (userRoleId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await userRoleDelete(userRoleId);
      showSuccessDialog();
      fetchUserRole();
      handleDropDownTableOpen(userRoleId);
    }
  };

  const handleRestoreUserRole = async (userRoleId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await userRoleRestore(userRoleId);
      showSuccessDialog();
      fetchUserRole();
      handleDropDownTableOpen(userRoleId);
    }
  };

  const headsTable = ["seq", "role name", "user count", ""];

  return (
    <div>
      <ContentTitle title="User Role" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <div className="flex flex-col md:flex-row justify-between gap-3 p-4">
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Add User Role" className="w-full md:w-auto" />
        </div>
        <CustomTable heads={headsTable}>
          {userRolePages?.content.map((userRole, index) => (
            <tr key={userRole.id} className={`${userRole.deleted ? "line-through text-red-500" : ""} border-b text-center`}>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {currentPage * CONSTANT_PAGE_SIZE_VALUE + index + 1}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {userRole.name}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {userRole.userCount}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                <button onClick={() => handleDropDownTableOpen(userRole.id)} className="w-7 h-7 p-4 inline-flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg" type="button">
                  <i className="fa-solid fa-ellipsis fa-lg" />
                </button>
                <div className="absolute">
                  <div className={`${isDropDownTableOpen[userRole.id] ? "" : "hidden"} absolute mt-3 z-50 w-44 bg-white rounded shadow py-1 -left-32 md:-left-28 xl:-left-10`}>
                    <ul className="divide-y divide-gray-100">
                      <li>{userRole.deleted ? <ButtonDropdown onClick={() => handleRestoreUserRole(userRole.id)} text="Restore" icon="fa-solid fa-trash-can-arrow-up" className="text-secondary-700" /> : <ButtonDropdown onClick={() => handleEditUserRole(userRole.id)} text="Edit" icon="fa-solid fa-pen-to-square" />}</li>
                      <li>
                        <ButtonDropdown onClick={() => handleDeleteUserRole(userRole.id)} text="Delete" icon="fa-solid fa-trash-can" className="text-red-500" />
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </CustomTable>
        <FooterTable numberOfElements={userRolePages?.numberOfElements ?? 0} totalElements={userRolePages?.totalElements ?? 0} totalPages={userRolePages?.totalPages ?? 10} handlePageChange={handlePageChange} />
        {isModalCreateOpen && <UserRoleModalCreate closeModal={() => setIsModalCreateOpen(false)} fetchUserRole={fetchUserRole} />}
        {isModalUpdateOpen && <UserRoleModalUpdate id={userRoleIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchUserRole={fetchUserRole} />}
      </section>
    </div>
  );
}
