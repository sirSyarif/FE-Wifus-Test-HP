import { CToast, CToaster, CToastHeader } from "@coreui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function index({ onOpen }) {
  return (
    <CToaster placement="top-end">
      <CToast autohide visible={onOpen}>
        <CToastHeader closeButton className="p-3">
          <BsFillCheckCircleFill
            style={{ marginRight: "10px" }}
            color="green"
            size={30}
          />
          <strong className="me-auto">Login berhasil !</strong>
        </CToastHeader>
      </CToast>
    </CToaster>
  );
}
