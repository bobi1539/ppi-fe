"use client";

import { buildPeriodRequest } from "./helper";
import { periodFindById, periodUpdate } from "@/app/backend-api/period";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";
import CommitteeDataModal from "./create-or-update";
import { PeriodResponse } from "@/app/dto/response/period-response";

interface CommitteeDataModalUpdateProps {
  id: number;
  closeModal: () => void;
  fetchPeriod: () => Promise<void>;
}

export default function CommitteeDataModalUpdate(props: Readonly<CommitteeDataModalUpdateProps>) {
  const [period, setPeriod] = useState<PeriodResponse>();

  useEffect(() => {
    fetchPeriodById();
  }, []);

  const fetchPeriodById = async (): Promise<void> => {
    const response = await periodFindById(props.id);
    setPeriod(response);
  };

  const submitUpdatePeriod = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildPeriodRequest(formData);
    await periodUpdate(props.id, request);
    await showSuccessDialog();
    await props.fetchPeriod();
    props.closeModal();
  };

  return <CommitteeDataModal submit={submitUpdatePeriod} closeModal={props.closeModal} title="Edit Committee Data" period={period} />;
}
