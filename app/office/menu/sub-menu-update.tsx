"use client";

import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import { buildSubMenuRequest, SEQUENCE, SUB_MENU_NAME } from "./helper";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";
import { removeNonDigit } from "@/app/utils/helper";
import { SubMenuResponse } from "@/app/dto/response/sub-menu-response";
import { subMenuFindById, subMenuUpdate } from "@/app/backend-api/sub-menu";
import ButtonSave from "@/app/components/button/button-save";

interface SubMenuModalUpdateProps {
  id: number;
  menuName: string;
  closeModal: () => void;
  fetchMenu: () => Promise<void>;
}

export default function SubMenuModalUpdate(props: Readonly<SubMenuModalUpdateProps>) {
  const [subMenu, setSubMenu] = useState<SubMenuResponse>();
  const [subMenuName, setSubMenuName] = useState<string>("");
  const [sequence, setSequence] = useState<number>(0);

  useEffect(() => {
    fetchSubMenubyId();
  }, []);

  const fetchSubMenubyId = async () => {
    const response = await subMenuFindById(props.id);
    setSubMenu(response);
    setSubMenuName(response.name);
    setSequence(response.sequence);
  };

  const submitUpdateSubMenu = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildSubMenuRequest(formData, subMenu);
    await subMenuUpdate(props.id, request);
    await showSuccessDialog();
    await props.fetchMenu();
    props.closeModal();
  };

  return (
    <Modal title={`Edit Sub Menu ${props.menuName}`} closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={submitUpdateSubMenu}>
        <div className="my-4">
          <InputLabel value={subMenuName} onChange={(e) => setSubMenuName(e.target.value)} label="Sub Menu Name" name={SUB_MENU_NAME} type="text" placeHolder="Type sub menu name" isRequired={true} />
          <InputLabel value={sequence} onChange={(e) => setSequence(removeNonDigit(e))} label="Sequence" name={SEQUENCE} type="text" placeHolder="Type sequence" isRequired={true} />
        </div>
        <div className="flex justify-end">
          <ButtonSave />
        </div>
      </form>
    </Modal>
  );
}
