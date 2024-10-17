"use client";

import { useEffect, useState } from "react";
import ButtonIcon from "../../../components/button-icon";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { userRoleCreate, userRoleFindAllPagination } from "@/app/backend-api/user-role";
import InputLabel from "@/app/components/input-label";
import { UserRoleRequest } from "@/app/dto/request/user-role-request";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { SearchDto } from "@/app/dto/search/search-dto";
import { PageResponse } from "@/app/dto/response/page-response";
import { CONSTANT_PAGE_SIZE_VALUE } from "@/app/constants/constant";
import PaginationTable from "@/app/components/pagination-table";
import PaginationSummary from "@/app/components/pagination-summary";
import ButtonDropdown from "@/app/components/button-dropdown";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";

export const ROLE_NAME = "role-name";

export default function UserRole() {
  const [userRolePages, setUserRolePages] = useState<PageResponse<UserRoleResponse>>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDropDownTableOpen, setIsDropDownTableOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchUserRole();
  }, [currentPage, searchValue]);

  const fetchUserRole = async () => {
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

  const submitSaveUserRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildUserRoleRequest(formData);
    await userRoleCreate(request);
    showSuccessDialog();
    setIsModalOpen(!isModalOpen);
    fetchUserRole();
  };

  const buildUserRoleRequest = (formData: FormData): UserRoleRequest => {
    return {
      name: formData.get(ROLE_NAME) as string,
    };
  };

  const handleDropDownTableOpen = (id: number): void => {
    setIsDropDownTableOpen((prevState: Record<string, boolean>) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[Number(key)] = false;
        return acc;
      }, {} as { [key: number]: boolean });

      return {
        ...newState,
        [id]: !prevState[id],
      };
    });
  };

  return (
    <div>
      <ContentTitle title="User Role" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-10">
        <div className="flex flex-col md:flex-row justify-between gap-3 p-4">
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <ButtonIcon onClick={() => setIsModalOpen(!isModalOpen)} type="button" icon="fa-solid fa-plus" text="Add User Role" className="w-full md:w-auto" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr className="text-center">
                <th scope="col" className="px-2 py-2 font-bold">
                  #seq
                </th>
                <th scope="col" className="px-2 py-2 font-bold">
                  role name
                </th>
                <th scope="col" className="px-2 py-2 font-bold">
                  user count
                </th>
                <th scope="col" className="px-2 py-2 font-bold" />
              </tr>
            </thead>
            <tbody>
              {userRolePages?.content.map((userRole, index) => (
                <tr key={userRole.id} className="border-b text-center">
                  <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                    {currentPage * CONSTANT_PAGE_SIZE_VALUE + index + 1}
                  </td>
                  <td scope="row" className="px-2.5 py-2 break-words text-left">
                    {userRole.name}
                  </td>
                  <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                    {userRole.userCount}
                  </td>
                  <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                    <button onClick={() => handleDropDownTableOpen(userRole.id)} className="w-7 h-7 p-4 inline-flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg" type="button">
                      <i className="fa-solid fa-ellipsis fa-lg" />
                    </button>
                    <div className={`${isDropDownTableOpen[userRole.id] ? "" : "hidden"} absolute mt-3 z-50 w-44 bg-white rounded shadow py-1`}>
                      <ul className="divide-y divide-gray-100">
                        <li>
                          <ButtonDropdown text="Edit" icon="fa-solid fa-pen-to-square" />
                        </li>
                        <li>
                          <ButtonDropdown text="Delete" icon="fa-solid fa-trash-can" className="text-red-500" />
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-end md:flex-row md:justify-between md:items-center gap-2 p-2 mt-2">
          <PaginationSummary numberOfElements={userRolePages?.numberOfElements} totalElements={userRolePages?.totalElements} />
          <PaginationTable total={userRolePages?.totalPages ?? 10} handlePageChange={handlePageChange} />
        </div>
        {isModalOpen && (
          <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-gray-900/50 ">
            <div className="max-w-lg relative w-full max-h-full p-4 bg-white rounded-lg shadow m-4">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b">
                <h3 className="text-lg font-semibold text-gray-900">Add User Role</h3>
                <button onClick={() => setIsModalOpen(!isModalOpen)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex justify-center items-center w-7 h-7">
                  <i className="fa-solid fa-xmark fa-lg"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={submitSaveUserRole}>
                <div className="my-4">
                  <InputLabel label="Role Name" name={ROLE_NAME} type="text" placeHolder="Type role name" isRequired={true} />
                </div>
                <div className="flex justify-end">
                  <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
