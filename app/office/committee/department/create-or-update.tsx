"use client";

import InputLabel from "@/app/components/input/input-label";
import InputSelectLabel, { Option } from "@/app/components/input/input-select-label";
import Modal from "@/app/components/modal/modal";
import { DivisionResponse } from "@/app/dto/response/division-response";
import { DEPARTMENT_NAME, getPeriodOption, getPeriodOptions, PERIOD_ID } from "./helper";
import ButtonIcon from "@/app/components/button/button-icon";
import { useEffect, useState } from "react";
import { periodFindAll } from "@/app/backend-api/period";
import { PeriodResponse } from "@/app/dto/response/period-response";

interface CommitteeDepartmentModalProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  closeModal: () => void;
  title: string;
  division?: DivisionResponse;
}

export default function CommitteeDepartmentModal(props: Readonly<CommitteeDepartmentModalProps>) {
  const [periods, setPeriods] = useState<PeriodResponse[]>([]);
  const [option, setOption] = useState<Option>();
  const [departmentName, setDepartmentName] = useState<string>("");

  useEffect(() => {
    fetchPeriod();
    if (props.division) {
      setOption(getPeriodOption(props.division.period));
      setDepartmentName(props.division.name);
    }
  }, [props.division]);

  const fetchPeriod = async (): Promise<void> => {
    const response = await periodFindAll({ search: "", isDeleted: false });
    setPeriods(response);
  };

  return (
    <Modal title={props.title} closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={props.submit}>
        <div className="my-4">
          <div className="grid grid-cols-1 gap-3">
            <InputSelectLabel option={option} label="Committee" name={PERIOD_ID} options={getPeriodOptions(periods)} />
            <InputLabel value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} label="Department Name" name={DEPARTMENT_NAME} type="text" placeHolder="Type department name" isRequired={true} />
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
