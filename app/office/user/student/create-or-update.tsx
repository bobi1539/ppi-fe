"use client";

import { StudentResponse } from "@/app/dto/response/student-response";
import ContentTitle from "../../components/content-title";
import InputImage from "@/app/components/input/input-image";
import { DIRECTORY_STUDENT } from "@/app/constants/constant";
import { FE_STUDENT } from "@/app/constants/endpoint-fe";
import ButtonBack from "@/app/components/button/button-back";
import { BIRTH_DATE, EDUCATION_ID, EMAIL, EXPECTED_GRADUATION_YEAR, GENDER_ID, MAJOR, NAME, NICKNAME, PHOTO } from "./helper";
import InputLabel from "@/app/components/input/input-label";
import { useEffect, useState } from "react";
import { systemParameterListFindAll } from "@/app/backend-api/system-parameter-list";
import { SYSTEM_PARAMETER_EDUCATION, SYSTEM_PARAMETER_GENDER } from "@/app/backend-api/system-parameter";
import { SystemParameterListSearchDto } from "@/app/dto/search/system-parameter-list-search-dto";
import { SystemParameterListResponse } from "@/app/dto/response/system-parameter-list-response";
import ButtonSave from "@/app/components/button/button-save";
import RadioButton from "@/app/components/input/radio-button";
import { getRadioOptionsFromParameterList, removeNonDigit } from "@/app/utils/helper";
import ButtonLoading from "@/app/components/button/button-loading";

interface StudentCreateOrUpdateProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  student?: StudentResponse;
  isLoading: boolean;
}

export default function StudentCreateOrUpdate(props: Readonly<StudentCreateOrUpdateProps>) {
  const [genders, setGenders] = useState<SystemParameterListResponse[]>([]);
  const [educations, setEducations] = useState<SystemParameterListResponse[]>([]);
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [expectedGraduationYear, setExpectedGraduationYear] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [education, setEducation] = useState<string>("");

  useEffect(() => {
    const fetchGender = async (): Promise<void> => {
      const response = await systemParameterListFindAll(buildSearchGender());
      setGenders(response);
    };
    fetchGender();

    systemParameterListFindAll(buildSearchEducation()).then((response) => setEducations(response));

    if (props.student) {
      setName(props.student.name);
      setNickname(props.student.nickname);
      setEmail(props.student.email);
      setMajor(props.student.major);
      setExpectedGraduationYear(props.student.expectedGraduationYear);
      setBirthDate(props.student.birthDate);
      setPhoto(props.student.photo);
      setGender(props.student.gender.id.toString());
      setEducation(props.student.education.id.toString());
    }
  }, [props.student]);

  const buildSearchGender = (): SystemParameterListSearchDto => {
    return { search: "", systemParameterId: SYSTEM_PARAMETER_GENDER };
  };

  const buildSearchEducation = (): SystemParameterListSearchDto => {
    return { search: "", systemParameterId: SYSTEM_PARAMETER_EDUCATION };
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <div className="flex justify-between">
          <ContentTitle title={props.title} />
        </div>
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={props.submit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
              <div className="grid grid-cols-1 gap-3">
                <InputImage currentImage={photo} directoryName={DIRECTORY_STUDENT} inputName={PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full object-cover" />
                <InputLabel className="mt-3" value={name} onChange={(e) => setName(e.target.value)} label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
                <InputLabel value={nickname} onChange={(e) => setNickname(e.target.value)} label="Nickname" name={NICKNAME} type="text" placeHolder="Type nickname" isRequired={true} />
                <InputLabel value={email} onChange={(e) => setEmail(e.target.value)} label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <InputLabel value={major} onChange={(e) => setMajor(e.target.value)} label="Major" name={MAJOR} type="text" placeHolder="Type major" isRequired={true} />
                <InputLabel value={expectedGraduationYear} onChange={(e) => setExpectedGraduationYear(removeNonDigit(e).toString())} label="Expected Graduation Year" name={EXPECTED_GRADUATION_YEAR} type="text" placeHolder="Type expected graduation year" isRequired={true} />
                <InputLabel value={birthDate} onChange={(e) => setBirthDate(e.target.value)} label="Birth Date" name={BIRTH_DATE} type="date" placeHolder="Type birth date" isRequired={true} />
                <RadioButton label="Gender" name={GENDER_ID} selectedValue={gender} options={getRadioOptionsFromParameterList(genders)} onChange={(e) => setGender(e.target.value)} required className="flex gap-2" />
                <RadioButton label="Education" name={EDUCATION_ID} selectedValue={education} options={getRadioOptionsFromParameterList(educations)} onChange={(e) => setEducation(e.target.value)} required />
              </div>
            </div>
            <div className="flex justify-between">
              <ButtonBack href={FE_STUDENT} />
              {props.isLoading ? <ButtonLoading className="px-9" /> : <ButtonSave />}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
