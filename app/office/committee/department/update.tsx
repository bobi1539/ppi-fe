"use client";

import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { divisionFindById, divisionUpdate } from "@/app/backend-api/division";
import { buildDivisionRequest } from "./helper";
import { useEffect, useState } from "react";
import CommitteeDepartmentModal from "./create-or-update";
import { DivisionResponse } from "@/app/dto/response/division-response";

interface CommitteeDepartmentModalUpdateProps {
  id: number;
  closeModal: () => void;
  fetchDivision: () => Promise<void>;
}

export default function CommitteeDepartmentModalUpdate(props: Readonly<CommitteeDepartmentModalUpdateProps>) {
  const [division, setDivision] = useState<DivisionResponse>();

  useEffect(() => {
    fetchDivisionById();
  }, []);

  const fetchDivisionById = async (): Promise<void> => {
    const response = await divisionFindById(props.id);
    setDivision(response);
  };

  const submitUpdatePeriod = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildDivisionRequest(formData);
    await divisionUpdate(props.id, request);
    await showSuccessDialog();
    await props.fetchDivision();
    props.closeModal();
  };

  return <CommitteeDepartmentModal submit={submitUpdatePeriod} closeModal={props.closeModal} title="Edit Committee Department" division={division} />;
}
