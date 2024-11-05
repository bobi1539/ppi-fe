"use client";

import { menuFindAll } from "@/app/backend-api/menu";
import { userRoleFindById } from "@/app/backend-api/user-role";
import { userRoleMenuCreate, userRoleMenuFindByUserRoleId } from "@/app/backend-api/user-role-menu";
import ButtonBack from "@/app/components/button/button-back";
import ButtonIcon from "@/app/components/button/button-icon";
import InputCheckbox from "@/app/components/input/input-checkbox";
import { FE_USER_ROLE } from "@/app/constants/endpoint-fe";
import { UserRoleMenuRequest } from "@/app/dto/request/user-role-menu-request";
import { UserRoleSubMenuRequest } from "@/app/dto/request/user-role-sub-menu-request";
import { MenuResponse } from "@/app/dto/response/menu-response";
import { SubMenuResponse } from "@/app/dto/response/sub-menu-response";
import ContentTitle from "@/app/office/components/content-title";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";

interface UserRoleMenuProps {
  params: {
    userRoleId: number;
  };
}

export default function UserRoleMenu(props: Readonly<UserRoleMenuProps>) {
  const [roleName, setRoleName] = useState<string>("");
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [menuMap, setMenuMap] = useState<Map<number, boolean>>(new Map());
  const [subMenuMap, setSubMenuMap] = useState<Map<number, boolean>>(new Map());

  useEffect(() => {
    fetchUserRoleById();
    fetchMenu();
    fetchUserRoleMenuByUserRoleId();
  }, []);

  useEffect(() => {
    console.log("hello world");
  }, [menuMap, subMenuMap]);

  const fetchUserRoleById = async (): Promise<void> => {
    const response = await userRoleFindById(props.params.userRoleId);
    setRoleName(response.name);
  };

  const fetchMenu = async (): Promise<void> => {
    const response = await menuFindAll({ search: "" });
    setMenus(response);
  };

  const fetchUserRoleMenuByUserRoleId = async (): Promise<void> => {
    const response = await userRoleMenuFindByUserRoleId(props.params.userRoleId);
    response.menus.forEach((menu) => {
      setMenuMap((prev) => {
        const newMenuMap = new Map(prev);
        newMenuMap.set(menu.id, true);
        return newMenuMap;
      });
      makeSubMenuMap(menu.subMenus);
    });
  };

  const makeSubMenuMap = (subMenus: SubMenuResponse[]): void => {
    subMenus.forEach((subMenu) => {
      setSubMenuMap((prev) => {
        const newSubMenuMap = new Map(prev);
        newSubMenuMap.set(subMenu.id, true);
        return newSubMenuMap;
      });
    });
  };

  const submitSaveUserRoleMenu = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const menuIds = getMenuIds(formData);
    const request: UserRoleMenuRequest = {
      userRoleId: props.params.userRoleId,
      menuIds: menuIds,
    };
    await userRoleMenuCreate(request);
    await showSuccessDialog();
  };

  const getMenuIds = (formData: FormData): UserRoleSubMenuRequest[] => {
    const menuIds: UserRoleSubMenuRequest[] = [];
    menus.forEach((menu) => {
      const menuIdOn = formData.get(`menu-id-${menu.id}`);
      const subMenuIds = getSubMenuIds(menu.subMenus, formData);

      if (menuIdOn !== null) {
        const userRoleSubMenuRequest: UserRoleSubMenuRequest = {
          menuId: menu.id,
          subMenuIds: subMenuIds,
        };
        menuIds.push(userRoleSubMenuRequest);
      }
    });
    return menuIds;
  };

  const getSubMenuIds = (subMenus: SubMenuResponse[], formData: FormData): number[] => {
    const subMenuIds: number[] = [];
    subMenus.forEach((subMenu) => {
      const subMenuIdOn = formData.get(`sub-menu-id-${subMenu.id}`);
      if (subMenuIdOn !== null) {
        subMenuIds.push(subMenu.id);
      }
    });
    return subMenuIds;
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-2xl">
        <ContentTitle title={`Role ${roleName}`} />
        <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
          <form onSubmit={submitSaveUserRoleMenu}>
            <div className="px-8 py-4">
              {menus.map((menu) => (
                <div key={menu.id}>
                  <InputCheckbox id={`menu-${menu.id}`} name={`menu-id-${menu.id}`} label={menu.name} checked={menuMap.get(menu.id)} />
                  {menu.subMenus.map((subMenu) => (
                    <InputCheckbox className="ml-10" key={`sub-menu-id-${subMenu.id}`} id={`sub-menu-id-${subMenu.id}`} name={`sub-menu-id-${subMenu.id}`} label={subMenu.name} checked={subMenuMap.get(subMenu.id)} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-between p-4">
              <ButtonBack href={FE_USER_ROLE} />
              <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
