"use client";

import { useRouter } from "next/navigation";
import StudentCreateOrUpdate from "../create-or-update";
import { buildStudentRequest } from "../helper";
import { studentCreate } from "@/app/backend-api/student";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { FE_STUDENT } from "@/app/constants/endpoint-fe";

export default function StudentCreate() {
  const router = useRouter();

  const submitSaveStudent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildStudentRequest(formData);
    await studentCreate(request);
    await showSuccessDialog();
    router.push(FE_STUDENT);
  };

  return <StudentCreateOrUpdate submit={submitSaveStudent} title="Add Student" />;
}
