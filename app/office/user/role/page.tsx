"use client";

import { useCallback, useEffect, useState } from "react";
import ButtonIcon from "../../../components/button/button-icon";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { userRoleDelete, userRoleFindAllPagination, userRoleRestore } from "@/app/backend-api/user-role";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import { SearchDto } from "@/app/dto/search/search-dto";
import { PageResponse } from "@/app/dto/response/page-response";
import { CONSTANT_PAGE_SIZE_VALUE, ICON_DELETE, ICON_EDIT, ICON_RESTORE, TEXT_COLOR_DELETE, TEXT_COLOR_EDIT, TEXT_COLOR_RESTORE, TEXT_DELETE, TEXT_EDIT, TEXT_RESTORE } from "@/app/constants/constant";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import UserRoleModalCreate from "./create";
import UserRoleModalUpdate from "./update";
import CustomTable from "@/app/components/table/custom-table";
import FooterTable from "@/app/components/table/footer-table";
import ContentSearch from "../../components/content-search";
import CustomDropdown from "@/app/components/dropdown/custom-dropdown";
import CustomDropdownItem from "@/app/components/dropdown/custom-dropdown-item";
import LoadingTable from "@/app/components/loading/loading-table";
import { useRouter } from "next/navigation";
import { FE_USER_ROLE } from "@/app/constants/endpoint-fe";

export default function UserRole() {
  const [userRolePages, setUserRolePages] = useState<PageResponse<UserRoleResponse>>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [userRoleIdUpdate, setUserRoleIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchUserRole = useCallback(async (): Promise<void> => {
    const buildSearchDto = (): SearchDto => {
      return {
        search: searchValue,
        page: currentPage,
        size: CONSTANT_PAGE_SIZE_VALUE,
      };
    };

    setIsLoading(true);
    const response = await userRoleFindAllPagination(buildSearchDto());
    setUserRolePages(response);
    setIsLoading(false);
  }, [currentPage, searchValue]);

  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleMenuUserRole = (id: number): void => {
    router.push(`${FE_USER_ROLE}/${id}/menu`);
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
          {isLoading ? (
            <LoadingTable colSpan={headsTable.length} />
          ) : (
            userRolePages?.content.map((userRole, index) => (
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
                    {userRole.deleted ? (
                      <CustomDropdownItem onClick={() => handleRestoreUserRole(userRole.id)} className={TEXT_COLOR_RESTORE} icon={ICON_RESTORE} text={TEXT_RESTORE} />
                    ) : (
                      <>
                        <CustomDropdownItem onClick={() => handleMenuUserRole(userRole.id)} className="" icon="fa-solid fa-list" text="Menu" />
                        <CustomDropdownItem onClick={() => handleEditUserRole(userRole.id)} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />{" "}
                      </>
                    )}
                    <CustomDropdownItem onClick={() => handleDeleteUserRole(userRole.id)} className={TEXT_COLOR_DELETE} icon={ICON_DELETE} text={TEXT_DELETE} />
                  </CustomDropdown>
                </td>
              </tr>
            ))
          )}
        </CustomTable>
        <FooterTable numberOfElements={userRolePages?.numberOfElements ?? 0} totalElements={userRolePages?.totalElements ?? 0} totalPages={userRolePages?.totalPages ?? 10} handlePageChange={handlePageChange} />
        {isModalCreateOpen && <UserRoleModalCreate closeModal={() => setIsModalCreateOpen(false)} fetchUserRole={fetchUserRole} />}
        {isModalUpdateOpen && <UserRoleModalUpdate id={userRoleIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchUserRole={fetchUserRole} />}
      </section>
    </div>
  );
}
