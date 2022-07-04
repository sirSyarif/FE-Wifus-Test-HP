import { CToast, CToaster, CToastHeader } from "@coreui/react";
import { BsFillCheckCircleFill, BsExclamationLg } from "react-icons/bs";

export default function index({ onOpen, isFailed }) {
  return (
    <CToaster placement="top-end">
      <CToast autohide visible={onOpen}>
        <CToastHeader closeButton className="p-3">
          {!isFailed ? (
            <BsExclamationLg
              style={{ marginRight: "10px" }}
              color="red"
              size={30}
            />
          ) : (
            <BsFillCheckCircleFill
              style={{ marginRight: "10px" }}
              color="green"
              size={30}
            />
          )}
          <strong className="me-auto">
            {!isFailed ? "Akun tidak ditemukan !" : "Login berhasil !"}
          </strong>
        </CToastHeader>
      </CToast>
    </CToaster>
  );
}
