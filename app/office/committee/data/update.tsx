"use client";

import Modal from "@/app/components/modal/modal";
import { buildPeriodRequest, COMMITTEE_NAME, END_DATE, START_DATE, STATUS, statusOptions } from "./helper";
import { periodFindById, periodUpdate } from "@/app/backend-api/period";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import InputLabel from "@/app/components/input/input-label";
import ButtonIcon from "@/app/components/button/button-icon";
import InputSelect from "@/app/components/input/input-select";
import { useEffect, useState } from "react";

interface CommitteeDataModalUpdateProps {
  id: number;
  closeModal: () => void;
  fetchPeriod: () => Promise<void>;
}

export default function CommitteeDataModalUpdate(props: Readonly<CommitteeDataModalUpdateProps>) {
  const [committeeName, setCommitteeName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetchPeriodById();
  }, []);

  const fetchPeriodById = async () => {
    const response = await periodFindById(props.id);
    setCommitteeName(response.name);
    setStartDate(response.startDate);
    setEndDate(response.endDate);
    setStatus(response.status ? "active" : "inactive");
  };

  const submitUpdatePeriod = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildPeriodRequest(formData);
    await periodUpdate(props.id, request);
    await showSuccessDialog();
    await props.fetchPeriod();
    props.closeModal();
  };

  return (
    <Modal title="Add Committee Data" closeModal={props.closeModal} className="max-w-2xl">
      <form onSubmit={submitUpdatePeriod}>
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
            <InputLabel value={committeeName} onChange={(e) => setCommitteeName(e.target.value)} label="Committee Name" name={COMMITTEE_NAME} type="text" placeHolder="Type committee name" isRequired={true} />
            <InputSelect label="Status" name={STATUS} options={statusOptions} currentValue={status} />
            <InputLabel value={startDate} onChange={(e) => setStartDate(e.target.value)} label="Start" name={START_DATE} type="date" isRequired={true} />
            <InputLabel value={endDate} onChange={(e) => setEndDate(e.target.value)} label="End" name={END_DATE} type="date" isRequired={true} />
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
