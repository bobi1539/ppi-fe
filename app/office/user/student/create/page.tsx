"use client";

import { useRouter } from "next/navigation";
import StudentCreateOrUpdate from "../create-or-update";
import { buildStudentRequest } from "../helper";
import { studentCreate } from "@/app/backend-api/student";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { FE_STUDENT } from "@/app/constants/endpoint-fe";
import { useState } from "react";

export default function StudentCreate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitSaveStudent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildStudentRequest(formData);
      await studentCreate(request);
      await showSuccessDialog();
      router.push(FE_STUDENT);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <StudentCreateOrUpdate submit={submitSaveStudent} title="Add Student" isLoading={isLoading} />;
}
