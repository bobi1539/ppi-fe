"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import InputLabel from "@/app/components/input/input-label";
import InputSelect from "@/app/components/input/input-select";
import Modal from "@/app/components/modal/modal";
import { PeriodResponse } from "@/app/dto/response/period-response";
import { useEffect, useState } from "react";
import { COMMITTEE_NAME, END_DATE, START_DATE, STATUS, statusOptions } from "./helper";

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
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (props.period) {
      setCommitteeName(props.period.name);
      setStartDate(props.period.startDate);
      setEndDate(props.period.endDate);
      setStatus(props.period.status ? "active" : "inactive");
    }
  }, [props.period]);

  return (
    <Modal title={props.title} closeModal={props.closeModal} className="max-w-2xl">
      <form onSubmit={props.submit}>
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
