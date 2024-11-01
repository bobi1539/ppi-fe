import Modal from "@/app/components/modal/modal";
import DetailStaff from "@/app/components/staff/detail-staff";
import { StaffResponse } from "@/app/dto/response/staff-response";

interface StaffDetailModalProps {
  closeModal: () => void;
  staff?: StaffResponse;
}

export default function StaffDetailModal(props: Readonly<StaffDetailModalProps>) {
  return (
    <Modal title="Staff Detail" closeModal={props.closeModal} className="max-w-7xl p-8 pt-4">
      <DetailStaff staff={props.staff} />
    </Modal>
  );
}
