"use client";

import InputLabel from "@/app/components/input/input-label";
import { useEffect, useState } from "react";
import { DESCRIPTION, FUN_FACT, getIsHeadOption, IS_HEAD, isHeadOptions, JOB_DESCRIPTION, POSITION, QUOTE, STAFF_NAME, STAFF_PHOTO } from "./helper";
import InputSelectLabel, { Option } from "@/app/components/input/input-select-label";
import { StaffResponse } from "@/app/dto/response/staff-response";
import InputImage from "@/app/components/input/input-image";
import { DIRECTORY_STAFF } from "@/app/constants/constant";
import TextArea from "@/app/components/input/text-area";
import Modal from "@/app/components/modal/modal";
import ButtonSave from "@/app/components/button/button-save";
import ButtonLoading from "@/app/components/button/button-loading";

interface DepartmentStaffModalProps {
  isLoading: boolean;
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  closeModal: () => void;
  title: string;
  staff?: StaffResponse;
}

export default function DepartmentStaffModal(props: Readonly<DepartmentStaffModalProps>) {
  const [staffName, setStaffName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [isHeadOption, setIsHeadOption] = useState<Option>();
  const [quote, setQuote] = useState<string>("");
  const [funFact, setFunFact] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    if (props.staff) {
      setStaffName(props.staff.name);
      setPosition(props.staff.position);
      setIsHeadOption(getIsHeadOption(props.staff.isHead));
      setQuote(props.staff.quote);
      setFunFact(props.staff.funFact);
      setDescription(props.staff.description);
      setJobDescription(props.staff.jobDescription);
      setPhoto(props.staff.photo);
    }
  }, [props.staff]);

  return (
    <Modal title={props.title} closeModal={props.closeModal} className="max-w-5xl">
      <form onSubmit={props.submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
          <div className="grid grid-cols-1 gap-3">
            <div className=" mt-3">
              <InputImage label="Upload Photo" currentImage={photo} directoryName={DIRECTORY_STAFF} inputName={STAFF_PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full object-cover" />
            </div>
            <InputLabel value={staffName} onChange={(e) => setStaffName(e.target.value)} label="Staff Name" name={STAFF_NAME} type="text" placeHolder="Type staff name" isRequired={true} />
            <InputLabel value={position} onChange={(e) => setPosition(e.target.value)} label="Position" name={POSITION} type="text" placeHolder="Type position" isRequired={true} />
            <TextArea label="Description" currentValue={description} onChange={(e) => setDescription(e.target.value)} name={DESCRIPTION} rows={4} />
          </div>
          <div className="flex flex-col gap-3">
            <InputSelectLabel option={isHeadOption} label="Head Of Department" name={IS_HEAD} options={isHeadOptions} required />
            <InputLabel value={quote} onChange={(e) => setQuote(e.target.value)} label="Quote" name={QUOTE} type="text" placeHolder="Type quote" isRequired={false} />
            <InputLabel value={funFact} onChange={(e) => setFunFact(e.target.value)} label="Fun Fact" name={FUN_FACT} type="text" placeHolder="Type fun fact" isRequired={false} />
            <TextArea label="Job Description" currentValue={jobDescription} onChange={(e) => setJobDescription(e.target.value)} name={JOB_DESCRIPTION} rows={12} />
          </div>
        </div>
        <div className="flex justify-end">{props.isLoading ? <ButtonLoading className="px-9" /> : <ButtonSave />}</div>
      </form>
    </Modal>
  );
}
