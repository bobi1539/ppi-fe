"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentSearch from "../../components/content-search";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { useEffect, useState } from "react";
import { PageResponse } from "@/app/dto/response/page-response";
import { UserResponse } from "@/app/dto/response/user-response";
import { userDelete, userFindAllPagination, userRestore } from "@/app/backend-api/user";
import { SearchDto } from "@/app/dto/search/search-dto";
import { CONSTANT_PAGE_SIZE_VALUE, ICON_DELETE, ICON_EDIT, ICON_RESTORE, TEXT_COLOR_DELETE, TEXT_COLOR_EDIT, TEXT_COLOR_RESTORE, TEXT_DELETE, TEXT_EDIT, TEXT_RESTORE } from "@/app/constants/constant";
import CustomTable from "@/app/components/table/custom-table";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import CustomDropdown from "@/app/components/dropdown/custom-dropdown";
import CustomDropdownItem from "@/app/components/dropdown/custom-dropdown-item";
import BadgeActive from "@/app/components/badge/badge-active";
import BadgeInactive from "@/app/components/badge/badge-inactive";
import FooterTable from "@/app/components/table/footer-table";
import Link from "next/link";
import { FE_USER_DATA, FE_USER_DATA_CREATE } from "@/app/constants/endpoint-fe";
import { useRouter } from "next/navigation";

export default function UserData() {
  const [userPages, setUserPages] = useState<PageResponse<UserResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [currentPage, searchValue]);

  const fetchUser = async (): Promise<void> => {
    const response = await userFindAllPagination(buildSearchDto());
    setUserPages(response);
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

  const handleEditUser = (id: number): void => {
    router.push(FE_USER_DATA + "/" + id + "/update");
  };

  const handleDeleteUser = async (userId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await userDelete(userId);
      showSuccessDialog();
      fetchUser();
    }
  };

  const handleRestoreUser = async (userId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await userRestore(userId);
      showSuccessDialog();
      fetchUser();
    }
  };

  const headsTable = ["seq", "username", "name", "email", "role", "status", ""];

  return (
    <div>
      <ContentTitle title="User Data" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <Link href={FE_USER_DATA_CREATE}>
              <ButtonIcon type="button" icon="fa-solid fa-plus" text="Add User" className="w-full md:w-auto" />
            </Link>
          </div>
        </ContentSearch>
        <CustomTable heads={headsTable}>
          {userPages?.content.map((user, index) => (
            <tr key={user.id} className={`${user.deleted ? "line-through text-red-500" : ""} border-b text-center`}>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {currentPage * CONSTANT_PAGE_SIZE_VALUE + index + 1}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {user.username}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {user.name}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {user.email}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {user.userRole.name}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                {user.isActive ? <BadgeActive /> : <BadgeInactive />}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                <CustomDropdown>
                  {user.deleted ? <CustomDropdownItem onClick={() => handleRestoreUser(user.id)} className={TEXT_COLOR_RESTORE} icon={ICON_RESTORE} text={TEXT_RESTORE} /> : <CustomDropdownItem onClick={() => handleEditUser(user.id)} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />}
                  <CustomDropdownItem onClick={() => handleDeleteUser(user.id)} className={TEXT_COLOR_DELETE} icon={ICON_DELETE} text={TEXT_DELETE} />
                </CustomDropdown>
              </td>
            </tr>
          ))}
        </CustomTable>
        <FooterTable numberOfElements={userPages?.numberOfElements ?? 0} totalElements={userPages?.totalElements ?? 0} totalPages={userPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
