import React, { useContext, useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CCardFooter,
  CButtonGroup,
  CButton,
  CFormGroup,
  CInput,
} from "@coreui/react";
// import data from "./data";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "src/context/Provider";
import { getAllAgentTravel } from "src/context/actions/AgentTravel/getAllAgentTravel";
import { LoadAnimationBlue } from "src/assets";
import { getImage } from "src/context/DownloadImage";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteAgentTravel } from "src/context/actions/AgentTravel/deleteAgentTravel";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

const MySwal = withReactContent(swal2);

const AgentTravel = () => {
  const history = useHistory();
  const [filterText, setFilterText] = useState("");
  const { agentTravelState, agentTravelDispatch } = useContext(GlobalContext);
  const { data } = agentTravelState;

  useEffect(() => {
    // Get All Agent Travel
    getAllAgentTravel(agentTravelDispatch);
  }, [agentTravelDispatch]);

  const filteredData = data.filter(
    (item) =>
      item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase())
  );

  const fields = ["no", "nama", "alamat", "kontak", "gambar", "aksi"];

  const goToTambah = () => {
    history.push("/ngetrip/admin/agent-travel/tambah");
  };

  const goToEdit = (id) => {
    history.push(`/ngetrip/admin/agent-travel/edit/${id}`);
  };

  const goToDetail = (id) => {
    history.push(`/ngetrip/admin/agent-travel/detail/${id}`);
  };

  const goToKontak = (id) => {
    history.push(`/ngetrip/admin/agent-travel/${id}/kontak`);
  };

  // Menangani tombol hapus
  const handleDelete = (id) => {
    MySwal.fire({
      icon: "warning",
      title: "Anda yakin ingin menghapus data ini ?",
      text: "Jika yakin, klik YA",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA",
    }).then((res) => {
      if (res.isConfirmed) {
        // Memanggil method deletePNS untuk menghapus data PNS
        deleteAgentTravel(id, agentTravelDispatch);
        MySwal.fire({
          icon: "success",
          title: "Terhapus",
          text: "Data berhasil dihapus",
        });
      }
    });
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h2>Agent Travel</h2>
        </CCardHeader>
        <CCardBody>
          <div className="controller mb-3 d-flex justify-content-between">
            <CButton type="button" color="primary" onClick={goToTambah}>
              Tambah Data
            </CButton>
            <CFormGroup className="m-0">
              <CInput
                type="text"
                id="pencarian"
                name="pencarian"
                onChange={(e) => setFilterText(e.target.value)}
                value={filterText}
                placeholder="Pencarian..."
              />
            </CFormGroup>
          </div>
          {!data.length > 0 ? (
            <div className="text-center">
              <img src={LoadAnimationBlue} alt="load-animation" width={30} />
            </div>
          ) : (
            <SimpleReactLightbox>
              <SRLWrapper>
                <CDataTable
                  items={filteredData}
                  fields={fields}
                  striped
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    aksi: (item) => (
                      <td>
                        <CButtonGroup>
                          <CButton
                            type="button"
                            color="info"
                            onClick={() => goToDetail(item.id_agent_travel)}
                          >
                            Detail
                          </CButton>
                          <CButton
                            type="button"
                            color="warning"
                            onClick={() => goToEdit(item.id_agent_travel)}
                          >
                            Edit
                          </CButton>
                          <CButton
                            type="button"
                            color="danger"
                            onClick={() => handleDelete(item.id_agent_travel)}
                          >
                            Hapus
                          </CButton>
                        </CButtonGroup>
                      </td>
                    ),
                    gambar: (item) => (
                      <td>
                        <a href={getImage(item.gambar)}>
                          <img
                            width={100}
                            className="img-thumbnail"
                            src={getImage(item.gambar)}
                            alt="gambar-agent-travel"
                          />
                        </a>
                      </td>
                    ),
                    kontak: (item) => (
                      <td>
                        <CButton
                          color="success"
                          onClick={() => goToKontak(item.id_agent_travel)}
                        >
                          Lihat
                        </CButton>
                      </td>
                    ),
                  }}
                />
              </SRLWrapper>
            </SimpleReactLightbox>
          )}
        </CCardBody>
        <CCardFooter>
          <p>
            <b>Total Data: </b> {data && data.length}
          </p>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default AgentTravel;
