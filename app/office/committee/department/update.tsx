"use client";

import Modal from "@/app/components/modal/modal";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import InputLabel from "@/app/components/input/input-label";
import ButtonIcon from "@/app/components/button/button-icon";
import { divisionFindById, divisionUpdate } from "@/app/backend-api/division";
import { buildDivisionRequest, DEPARTMENT_NAME, getPeriodOptions, PERIOD_ID } from "./helper";
import { PeriodResponse } from "@/app/dto/response/period-response";
import InputSelect from "@/app/components/input/input-select";
import { useEffect, useState } from "react";

interface CommitteeDepartmentModalUpdateProps {
  id: number;
  periods: PeriodResponse[];
  closeModal: () => void;
  fetchDivision: () => Promise<void>;
}

export default function CommitteeDepartmentModalUpdate(props: Readonly<CommitteeDepartmentModalUpdateProps>) {
  const [departmentName, setDepartmentName] = useState<string>("");
  const [period, setPeriod] = useState<PeriodResponse>();

  useEffect(() => {
    fetchDivisionById();
  }, []);

  const fetchDivisionById = async (): Promise<void> => {
    const response = await divisionFindById(props.id);
    setDepartmentName(response.name);
    setPeriod(response.period);
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

  return (
    <Modal title="Edit Committee Department" closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={submitUpdatePeriod}>
        <div className="my-4">
          <div className="grid grid-cols-1 gap-3">
            <InputSelect currentValue={period?.deleted ? "" : period?.id.toString()} label="Committee" name={PERIOD_ID} options={getPeriodOptions(props.periods)} />
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
