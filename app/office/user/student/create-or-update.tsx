"use client";

import { StudentResponse } from "@/app/dto/response/student-response";
import ContentTitle from "../../components/content-title";
import InputImage from "@/app/components/input/input-image";
import { DIRECTORY_STUDENT } from "@/app/constants/constant";
import { FE_STUDENT } from "@/app/constants/endpoint-fe";
import ButtonBack from "@/app/components/button/button-back";
import ButtonIcon from "@/app/components/button/button-icon";
import { BIRTH_DATE, EDUCATION, EMAIL, GENDER_ID, getGenderOption, getGenderOptions, GRADUATION, MAJOR, NAME, PHOTO } from "./helper";
import InputLabel from "@/app/components/input/input-label";
import { useEffect, useState } from "react";
import InputSelectLabel, { Option } from "@/app/components/input/input-select-label";
import { systemParameterListFindAll } from "@/app/backend-api/system-parameter-list";
import { SYSTEM_PARAMETER_GENDER } from "@/app/backend-api/system-parameter";
import { SystemParameterListSearchDto } from "@/app/dto/search/system-parameter-list-search-dto";
import { SystemParameterListResponse } from "@/app/dto/response/system-parameter-list-response";

interface StudentCreateOrUpdateProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  student?: StudentResponse;
}

export default function StudentCreateOrUpdate(props: Readonly<StudentCreateOrUpdateProps>) {
  const [genders, setGenders] = useState<SystemParameterListResponse[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [graduation, setGraduation] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [genderOption, setGenderOption] = useState<Option>();

  useEffect(() => {
    fetchGender();
    if (props.student) {
      setName(props.student.name);
      setEmail(props.student.email);
      setMajor(props.student.major);
      setEducation(props.student.education);
      setGraduation(props.student.graduation);
      setBirthDate(props.student.birthDate);
      setPhoto(props.student.photo);
      setGenderOption(getGenderOption(props.student.gender));
    }
  }, [props.student]);

  const fetchGender = async (): Promise<void> => {
    const response = await systemParameterListFindAll(buildSearchGender());
    setGenders(response);
  };

  const buildSearchGender = (): SystemParameterListSearchDto => {
    return { search: "", systemParameterId: SYSTEM_PARAMETER_GENDER };
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <div className="flex justify-between">
          <ContentTitle title={props.title} />
        </div>
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={props.submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="grid grid-cols-1 gap-3">
                <InputImage currentImage={photo} directoryName={DIRECTORY_STUDENT} inputName={PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full object-cover" />
                <InputLabel className="mt-3" value={name} onChange={(e) => setName(e.target.value)} label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
                <InputLabel value={email} onChange={(e) => setEmail(e.target.value)} label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <InputSelectLabel label="Gender" name={GENDER_ID} option={genderOption} options={getGenderOptions(genders)} required />
                <InputLabel value={major} onChange={(e) => setMajor(e.target.value)} label="Major" name={MAJOR} type="text" placeHolder="Type major" isRequired={true} />
                <InputLabel value={education} onChange={(e) => setEducation(e.target.value)} label="Education" name={EDUCATION} type="text" placeHolder="Type education" isRequired={true} />
                <InputLabel value={graduation} onChange={(e) => setGraduation(e.target.value)} label="Graduation" name={GRADUATION} type="text" placeHolder="Type graduation" isRequired={false} />
                <InputLabel value={birthDate} onChange={(e) => setBirthDate(e.target.value)} label="Birth Date" name={BIRTH_DATE} type="date" placeHolder="Type birth date" isRequired={false} />
              </div>
            </div>
            <div className="flex justify-between">
              <ButtonBack href={FE_STUDENT} />
              <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
