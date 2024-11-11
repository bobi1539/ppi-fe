"use client";

import { useRouter } from "next/navigation";
import StudentCreateOrUpdate from "../../create-or-update";
import { useEffect, useState } from "react";
import { StudentResponse } from "@/app/dto/response/student-response";
import { buildStudentRequest } from "../../helper";
import { studentFindById, studentUpdate } from "@/app/backend-api/student";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { FE_STUDENT } from "@/app/constants/endpoint-fe";

interface StudentUpdateProps {
  params: {
    studentId: number;
  };
}

export default function StudentUpdate(props: Readonly<StudentUpdateProps>) {
  const [student, setStudent] = useState<StudentResponse>();
  const router = useRouter();

  useEffect(() => {
    const fetchStudentById = async (): Promise<void> => {
      const response = await studentFindById(props.params.studentId);
      setStudent(response);
    };

    fetchStudentById();
  }, [props.params.studentId]);

  const submitUpdateStudent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildStudentRequest(formData);
    await studentUpdate(props.params.studentId, request);
    await showSuccessDialog();
    router.push(FE_STUDENT);
  };

  return <StudentCreateOrUpdate student={student} submit={submitUpdateStudent} title="Add Student" />;
}
