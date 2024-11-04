import Swal, { SweetAlertResult } from "sweetalert2";

export const showConfirmDialog = async (title: string): Promise<SweetAlertResult<null>> => {
  return await Swal.fire({
    title: title,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6d28d9",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes",
  });
};

export const showSuccessDialog = async (text?: string): Promise<void> => {
  await Swal.fire({
    title: "Success",
    text: text,
    icon: "success",
    confirmButtonColor: "#6d28d9",
    customClass: {
      popup: "custom-swal",
    },
  });
};

export const showErrorDialog = async (text: string): Promise<void> => {
  await Swal.fire({
    title: "Oops...",
    text: text,
    icon: "error",
    confirmButtonColor: "#6d28d9",
  });
};

export const showConfirmDeleteDialog = async (): Promise<SweetAlertResult<null>> => {
  return await showConfirmDialog("Are you sure to delete ?");
};

export const showConfirmRestoreDialog = async (): Promise<SweetAlertResult<null>> => {
  return await showConfirmDialog("Are you sure to restore ?");
};
