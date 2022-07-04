import Image from "next/image";
import { CContainer, CCol, CRow, CPopover } from "@coreui/react";

import { CustomIfame } from "components";
import placeholder from "public/assets/placeholder.webp";

export default function index({ cardData }) {
  return (
    <CContainer>
      <CRow className="align-items-center justify-content-center">
        <CCol lg={3}>
          <Image
            width={75}
            height={75}
            quality={100}
            src={cardData.image || placeholder}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPMqAcAAVUA6UpAAT4AAAAASUVORK5CYII="
            style={{ borderRadius: "50%" }}
          />
        </CCol>
        <CCol lg={6}>
          <h4>{cardData.name}</h4>
          <p>{`House of ${cardData.house || "Unknown"}`}</p>
        </CCol>
        <CCol lg={3}>
          <CPopover
            content={<CustomIfame link={`/character-list/${cardData.name}`} />}
            placement="bottom"
            trigger="hover"
          >
            <a href={`/character-list/${cardData.name}`}>Lihat Detail</a>
          </CPopover>
        </CCol>
      </CRow>
    </CContainer>
  );
}
