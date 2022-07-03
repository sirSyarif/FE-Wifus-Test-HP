import {
  CPopover,
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormInput,
} from "@coreui/react";
import { BsFillFilterCircleFill, BsCaretDown, BsCaretUp } from "react-icons/bs";

export default function Popover({
  search,
  onChangeSearch,
  handleSearch,
  handleSort,
  order,
}) {
  const Filter = () => (
    <>
      <CContainer>
        <CRow className="row align-items-center justify-content-start">
          <CCol lg={12}>
            <CFormInput
              placeholder="Name"
              value={search}
              onChange={(e) => onChangeSearch(e)}
            />
          </CCol>
          <CCol style={{ textAlign: "right" }} className="p-3" lg={12}>
            <CButton onClick={handleSearch}>Search</CButton>
            <CButton onClick={handleSort}>
              {order === "asc" ? <BsCaretUp /> : <BsCaretDown />}
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
  return (
    <div>
      <CPopover content={Filter()} placement="left">
        <CButton color="secondary">
          <BsFillFilterCircleFill size={30} />
        </CButton>
      </CPopover>
    </div>
  );
}
