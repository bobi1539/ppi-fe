"use client";

import { webStudentCreate } from "@/app/backend-api/student";
import { SYSTEM_PARAMETER_EDUCATION, SYSTEM_PARAMETER_GENDER } from "@/app/backend-api/system-parameter";
import { webSystemParameterListFindAll } from "@/app/backend-api/system-parameter-list";
import ButtonLoading from "@/app/components/button/button-loading";
import ButtonSave from "@/app/components/button/button-save";
import InputImage from "@/app/components/input/input-image";
import InputLabel from "@/app/components/input/input-label";
import RadioButton from "@/app/components/input/radio-button";
import { DIRECTORY_STUDENT } from "@/app/constants/constant";
import { WebStudentRequest } from "@/app/dto/request/web-student-request";
import { SystemParameterListResponse } from "@/app/dto/response/system-parameter-list-response";
import { SystemParameterListSearchDto } from "@/app/dto/search/system-parameter-list-search-dto";
import { BIRTH_DATE, EDUCATION_ID, EMAIL, EXPECTED_GRADUATION_YEAR, GENDER_ID, MAJOR, NAME, NICKNAME, PHOTO } from "@/app/office/user/student/helper";
import { getFileFormData, getRadioOptionsFromParameterList, removeNonDigit } from "@/app/utils/helper";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";

const SECRET_KEY: string = "secret-key";

export default function StudentForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConsent, setIsConsent] = useState<boolean>(false);
  const [genders, setGenders] = useState<SystemParameterListResponse[]>([]);
  const [educations, setEducations] = useState<SystemParameterListResponse[]>([]);
  const [gender, setGender] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [expectedGraduationYear, setExpectedGraduationYear] = useState<string>("");

  useEffect(() => {
    webSystemParameterListFindAll(buildSearchGender()).then((response) => setGenders(response));
    webSystemParameterListFindAll(buildSearchEducation()).then((response) => setEducations(response));
  }, [isConsent]);

  const buildSearchGender = (): SystemParameterListSearchDto => {
    return { search: "", systemParameterId: SYSTEM_PARAMETER_GENDER };
  };

  const buildSearchEducation = (): SystemParameterListSearchDto => {
    return { search: "", systemParameterId: SYSTEM_PARAMETER_EDUCATION };
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildWebStudentRequest(formData);
    webStudentCreate(request)
      .then(() => showSuccessDialog())
      .finally(() => setIsLoading(false));
  };

  const buildWebStudentRequest = async (formData: FormData): Promise<WebStudentRequest> => {
    const photo = await getFileFormData(formData, PHOTO);
    return {
      name: String(formData.get(NAME)),
      nickname: String(formData.get(NICKNAME)),
      email: String(formData.get(EMAIL)),
      major: String(formData.get(MAJOR)),
      expectedGraduationYear: String(formData.get(EXPECTED_GRADUATION_YEAR)),
      birthDate: String(formData.get(BIRTH_DATE)),
      genderId: Number(formData.get(GENDER_ID)),
      educationId: Number(formData.get(EDUCATION_ID)),
      photo: photo,
      secretKey: String(formData.get(SECRET_KEY)),
    };
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:py-16 md:px-6">
        <div className="mb-6 divide-y-2 border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col items-center my-2">
            <h1 className="font-bold text-2xl">Student Data</h1>
            <p className="text-red-500">* Indicates required questions</p>
          </div>
          <div className="lg:mx-32">
            <div className="flex items-center gap-3 p-2">
              <div className="relative flex items-center">
                <input type="checkbox" onChange={() => setIsConsent(!isConsent)} name="consent" id="consent" className={`w-[22px] h-[22px] appearance-none border  rounded ${isConsent ? "bg-secondary-700 border-secondary-700" : "bg-gray-50 border-gray-300"}`} />
                {isConsent && <i className="fa-solid fa-check text-white absolute top-1 left-1" onClick={() => setIsConsent(!isConsent)} />}
              </div>
              <label className="font-bold text-gray-900" htmlFor="consent">
                I consent
              </label>
            </div>
            <p className="text-gray-500 ml-10 -mt-2">By checking this box, you consent to the recording and use of your data by PPI Warwick</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 relative">
          {!isConsent ? <div className="bg-gray-200/50 w-full h-full rounded-lg absolute top-0 left-0" /> : ""}
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
              <div className="grid grid-cols-1 gap-3">
                <InputImage directoryName={DIRECTORY_STUDENT} inputName={PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full object-cover" />
                <InputLabel label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
                <InputLabel label="Nickname" name={NICKNAME} type="text" placeHolder="Type nickname" isRequired={true} />
                <InputLabel label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
                <InputLabel label="Major" name={MAJOR} type="text" placeHolder="Type major" isRequired={true} />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <InputLabel className="lg:mt-8" value={expectedGraduationYear} onChange={(e) => setExpectedGraduationYear(removeNonDigit(e).toString())} label="Expected Graduation Year" name={EXPECTED_GRADUATION_YEAR} type="text" placeHolder="Type expected graduation year" isRequired={true} />
                <InputLabel label="Birth Date" name={BIRTH_DATE} type="date" placeHolder="Type birth date" isRequired={true} />
                <RadioButton label="Gender" name={GENDER_ID} selectedValue={gender} options={getRadioOptionsFromParameterList(genders)} onChange={(e) => setGender(e.target.value)} required />
                <RadioButton label="Education" name={EDUCATION_ID} selectedValue={education} options={getRadioOptionsFromParameterList(educations)} onChange={(e) => setEducation(e.target.value)} required />
                <InputLabel label="Secret Key" name={SECRET_KEY} type="text" placeHolder="Type secret key" isRequired={true} />
              </div>
            </div>
            <div className="flex justify-end">{isLoading ? <ButtonLoading className="px-9" /> : <ButtonSave />}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
