import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import Image from "next/image";

import placeholder from "public/assets/placeholder.webp";
import CharacterService from "services/CharacterService";

export default function DetailCharacter({ characters }) {
  const [selectedChar, setSelectedChar] = useState("");

  const router = useRouter();

  const {
    query: { name },
  } = router;

  useEffect(() => {
    setSelectedChar(characters?.filter((_char) => _char.name === name)[0]);
  }, [name]);

  return (
    <div className="container">
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <CCard
          className=" col-lg-5 col-sm-12 mx-auto"
          style={{ height: "90vh" }}
        >
          <CCardHeader>
            <h2 className="text-center">{`${name} Detail Information`}</h2>
          </CCardHeader>
          <CCardBody>
            <center>
              <Image
                width={200}
                height={200}
                quality={100}
                src={selectedChar?.image || placeholder}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPMqAcAAVUA6UpAAT4AAAAASUVORK5CYII="
              />
            </center>
            <h3 className="text-center">{selectedChar?.name}</h3>
            <CContainer>
              <CRow className="row align-items-center">
                <CCol sm="auto">
                  <h4 className="text-center">Date of Birth : </h4>
                </CCol>
                <CCol sm="auto" className="m-0">
                  {selectedChar?.dateOfBirth || "-"}
                </CCol>
              </CRow>
              <CRow className="row align-items-center">
                <CCol sm="auto">
                  <h4>Family of : </h4>
                </CCol>
                <CCol sm="auto" className="m-0">
                  {selectedChar?.house || "-"}
                </CCol>
              </CRow>
              <CRow className="row align-items-center">
                <CCol sm="auto">
                  <h4>Species : </h4>
                </CCol>
                <CCol sm="auto" className="m-0">
                  {selectedChar?.species || "-"}
                </CCol>
              </CRow>
              <CRow className="row align-items-center">
                <CCol sm="auto">
                  <h4>Gender : </h4>
                </CCol>
                <CCol sm="auto" className="m-0">
                  {selectedChar?.gender || "-"}
                </CCol>
              </CRow>
              <CRow className="row align-items-center">
                <CCol sm="auto">
                  <h4>Ancestry : </h4>
                </CCol>
                <CCol sm="auto" className="m-0">
                  {selectedChar?.ancestry || "-"}
                </CCol>
              </CRow>
            </CContainer>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await CharacterService.getCharacter();

  const characters = response.data;

  return {
    props: {
      characters,
    },
  };
}
