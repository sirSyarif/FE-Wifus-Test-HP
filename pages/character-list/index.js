import { useState } from "react";
import {
  CContainer,
  CCol,
  CRow,
  CPagination,
  CPaginationItem,
  CFormSelect,
} from "@coreui/react";

import CharacterService from "services/CharacterService";
import { ListCharacter, Popover } from "components";

// sorting func
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default function CharacterList({ characters }) {
  const [isSort, setIsSort] = useState(false);
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [filteredCharacter, setFilteredCharacter] = useState(characters);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangePage = (_page) => {
    setPage(page + _page);
  };

  const requestSearch = () => {
    const filteredRows = characters.filter((_char) =>
      _char.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setFilteredCharacter(filteredRows);
  };

  const handleRequestSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
    setIsSort(true);
  };

  function stableSort(array, comparator) {
    if (isSort) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } else {
      return array;
    }
  }

  function getComparator(order, orderBy) {
    if (isSort) {
      return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
  }

  return (
    <div className="container">
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <CContainer
          style={{
            height: "90vh",
            background: "white",
            overflow: "auto",
            borderRadius: "10px",
          }}
        >
          <CContainer>
            <CRow className="row align-items-center justify-content-start">
              <CCol>
                <h2 className="p-3">Character List</h2>
              </CCol>
              <CCol style={{ textAlign: "right" }} className="p-3">
                <Popover
                  search={search}
                  handleSearch={requestSearch}
                  handleSort={handleRequestSort}
                  onChangeSearch={onChangeSearch}
                  order={order}
                />
              </CCol>
            </CRow>
          </CContainer>
          <CRow className="align-items-center mx-auto">
            {stableSort(filteredCharacter, getComparator(order, "name"))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <CCol lg={6} className="mb-2" key={item.name}>
                  <ListCharacter cardData={item} />
                </CCol>
              ))}
            {filteredCharacter.length === 0 && (
              <center>
                <h2>Character Not Found</h2>
              </center>
            )}
          </CRow>
          <div
            className="ms-auto d-flex justify-content-end"
            style={{ marginRight: "30px" }}
          >
            <div className="align-self-center" style={{ marginRight: "50px" }}>
              <CPagination size="lg" align="end" className="m-0">
                <CPaginationItem
                  onClick={() => handleChangePage(-1)}
                  disabled={page === 0}
                >
                  &laquo;
                </CPaginationItem>
                <CPaginationItem onClick={() => handleChangePage(1)}>
                  &raquo;
                </CPaginationItem>
              </CPagination>
            </div>
            <div className="align-self-center me-3">
              <p className="m-0">Results per page</p>
            </div>
            <div className="align-self-center">
              <CFormSelect onChange={(e) => setRowsPerPage(e.target.value)}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </CFormSelect>
            </div>
          </div>
        </CContainer>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await CharacterService.getCharacter();

  const characters = response.data;

  return {
    props: {
      characters,
    },
  };
}
