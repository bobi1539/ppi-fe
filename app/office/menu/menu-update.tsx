"use client";

import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import ButtonIcon from "@/app/components/button/button-icon";
import { buildMenuRequest, MENU_NAME, SEQUENCE } from "./helper";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";
import { menuFindById, menuUpdate } from "@/app/backend-api/menu";
import { MenuResponse } from "@/app/dto/response/menu-response";
import { removeNonDigit } from "@/app/utils/helper";

interface MenuModalUpdateProps {
  id: number;
  closeModal: () => void;
  fetchMenu: () => Promise<void>;
}

export default function MenuModalUpdate(props: Readonly<MenuModalUpdateProps>) {
  const [menu, setMenu] = useState<MenuResponse>();
  const [menuName, setMenuName] = useState<string>("");
  const [sequence, setSequence] = useState<number>(0);

  useEffect(() => {
    fetchMenubyId();
  }, []);

  const fetchMenubyId = async () => {
    const response = await menuFindById(props.id);
    setMenu(response);
    setMenuName(response.name);
    setSequence(response.sequence);
  };

  const submitUpdateMenu = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildMenuRequest(formData, menu);
    await menuUpdate(props.id, request);
    await showSuccessDialog();
    await props.fetchMenu();
    props.closeModal();
  };

  return (
    <Modal title="Edit User Role" closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={submitUpdateMenu}>
        <div className="my-4">
          <InputLabel value={menuName} onChange={(e) => setMenuName(e.target.value)} label="Menu Name" name={MENU_NAME} type="text" placeHolder="Type menu name" isRequired={true} />
          <InputLabel value={sequence} onChange={(e) => setSequence(removeNonDigit(e))} label="Sequence" name={SEQUENCE} type="text" placeHolder="Type sequence" isRequired={true} />
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
