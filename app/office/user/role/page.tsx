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
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import UserRoleModalCreate from "./create";
import UserRoleModalUpdate from "./update";
import CustomTable from "@/app/components/table/custom-table";
import FooterTable from "@/app/components/table/footer-table";
import ContentSearch from "../../components/content-search";
import CustomDropdown from "@/app/components/dropdown/custom-dropdown";
import CustomDropdownItem from "@/app/components/dropdown/custom-dropdown-item";

export default function UserRole() {
  const [userRolePages, setUserRolePages] = useState<PageResponse<UserRoleResponse>>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [userRoleIdUpdate, setUserRoleIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

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

  const handleEditUserRole = (id: number): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setUserRoleIdUpdate(id);
  };

  const handleDeleteUserRole = async (userRoleId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await userRoleDelete(userRoleId);
      showSuccessDialog();
      fetchUserRole();
    }
  };

  const handleRestoreUserRole = async (userRoleId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await userRoleRestore(userRoleId);
      showSuccessDialog();
      fetchUserRole();
    }
  };

  const headsTable = ["seq", "role name", "user count", ""];

  return (
    <div>
      <ContentTitle title="User Role" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Add User Role" className="w-full md:w-auto" />
          </div>
        </ContentSearch>
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
                <CustomDropdown>
                  {userRole.deleted ? <CustomDropdownItem onClick={() => handleRestoreUserRole(userRole.id)} className="text-secondary-700" icon="fa-solid fa-trash-can-arrow-up" text="Restore" /> : <CustomDropdownItem onClick={() => handleEditUserRole(userRole.id)} className="text-gray-700" icon="fa-solid fa-pen-to-square" text="Edit" />}
                  <CustomDropdownItem onClick={() => handleDeleteUserRole(userRole.id)} className="text-red-500" icon="fa-solid fa-trash-can" text="Delete" />
                </CustomDropdown>
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
