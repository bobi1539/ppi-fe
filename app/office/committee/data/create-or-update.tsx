"use client";

import InputLabel from "@/app/components/input/input-label";
import InputSelectLabel, { Option } from "@/app/components/input/input-select-label";
import Modal from "@/app/components/modal/modal";
import { PeriodResponse } from "@/app/dto/response/period-response";
import { useEffect, useState } from "react";
import { COMMITTEE_NAME, END_DATE, getStatusOption, START_DATE, STATUS, statusOptions } from "./helper";
import ButtonSave from "@/app/components/button/button-save";

interface CommitteeDataModalProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  closeModal: () => void;
  title: string;
  period?: PeriodResponse;
}

export default function CommitteeDataModal(props: Readonly<CommitteeDataModalProps>) {
  const [committeeName, setCommitteeName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [statusOption, setStatusOption] = useState<Option>();

  useEffect(() => {
    if (props.period) {
      setCommitteeName(props.period.name);
      setStartDate(props.period.startDate);
      setEndDate(props.period.endDate);
      setStatusOption(getStatusOption(props.period.status));
    }
  }, [props.period]);

  return (
    <Modal title={props.title} closeModal={props.closeModal} className="max-w-2xl">
      <form onSubmit={props.submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
          <InputLabel value={committeeName} onChange={(e) => setCommitteeName(e.target.value)} label="Committee Name" name={COMMITTEE_NAME} type="text" placeHolder="Type committee name" isRequired={true} />
          <InputSelectLabel placeholder="--Select--" label="Status" name={STATUS} option={statusOption} options={statusOptions} required />
          <InputLabel value={startDate} onChange={(e) => setStartDate(e.target.value)} label="Start" name={START_DATE} type="date" isRequired={true} />
          <InputLabel value={endDate} onChange={(e) => setEndDate(e.target.value)} label="End" name={END_DATE} type="date" isRequired={true} />
        </div>
        <div className="flex justify-end">
          <ButtonSave />
        </div>
      </form>
    </Modal>
  );
}
