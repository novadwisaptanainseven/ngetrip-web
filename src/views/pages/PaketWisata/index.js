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
  CSelect,
} from "@coreui/react";
// import data from "./data";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "src/context/Provider";
import { LoadAnimationBlue } from "src/assets";
// import { getImage } from "src/context/DownloadImage";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import data from "./data";
import { getSelectAgentTravel } from "src/context/actions/AgentTravel/getSelectAgentTravel";
import { getPaketWisata } from "src/context/actions/PaketWisata/getPaketWisata";
// import { CLEAN_UP } from "src/context/actionTypes";
import { getPaketWisataByAgentTravelMain } from "src/context/actions/PaketWisata/getPaketWisataByAgentTravelMain";
import { deletePaketWisata } from "src/context/actions/PaketWisata/deletePaketWisata";

const MySwal = withReactContent(swal2);

const PaketWisata = () => {
  const history = useHistory();
  const [filterText, setFilterText] = useState("");
  const { paketWisataState, paketWisataDispatch } = useContext(GlobalContext);
  const { data } = paketWisataState;
  const [agentTravel, setAgentTravel] = useState([]);
  const [idAgent, setIdAgent] = useState("semua");

  // Get Agent Travel
  useEffect(() => {
    getSelectAgentTravel(setAgentTravel);
  }, []);

  useEffect(() => {
    if (idAgent === "semua") {
      // Get All Paket Wisata
      getPaketWisata(paketWisataDispatch);
    } else {
      // Get Paket Wisata by Agent Travel
      // paketWisataDispatch({
      //   type: CLEAN_UP,
      // });
      getPaketWisataByAgentTravelMain(idAgent, paketWisataDispatch);
    }
  }, [idAgent, paketWisataDispatch]);

  const filteredData = data.filter(
    (item) =>
      item.nama_paket_wisata &&
      item.nama_paket_wisata.toLowerCase().includes(filterText.toLowerCase())
  );

  const fields = [
    "no",
    "nama_paket_wisata",
    // "agent_travel",
    "harga",
    "meeting_point",
    "include",
    "exclude",
    "gambar",
    "deskripsi",
    "aksi",
  ];

  const goToTambah = () => {
    history.push("/ngetrip/admin/paket-wisata/tambah");
  };

  const goToEdit = (id) => {
    history.push(`/ngetrip/admin/paket-wisata/edit/${id}`);
  };

  const goToDetail = (id) => {
    history.push(`/ngetrip/admin/paket-wisata/detail/${id}`);
  };

  const goToInclude = (id) => {
    history.push(`/ngetrip/admin/paket-wisata/${id}/include`);
  };

  const goToExclude = (id) => {
    history.push(`/ngetrip/admin/paket-wisata/${id}/exclude`);
  };

  const goToGambar = (id) => {
    history.push(`/ngetrip/admin/paket-wisata/${id}/gambar`);
  };

  const goToDeskripsi = (id) => {
    history.push(`/ngetrip/admin/paket-wisata/${id}/deskripsi`);
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
        // Memanggil method delete untuk menghapus data
        deletePaketWisata(id, paketWisataDispatch);
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
          <h2>Paket Wisata</h2>
        </CCardHeader>
        <CCardBody>
          <div className="controller mb-3 d-flex justify-content-between">
            <CButton type="button" color="primary" onClick={goToTambah}>
              Tambah Data
            </CButton>

            <CFormGroup className="m-0">
              <CSelect
                id="agent-travel"
                name="agent-travel"
                onChange={(e) => setIdAgent(e.target.value)}
              >
                <option value="semua">-- Filter Agent Travel --</option>
                {agentTravel.map((item, index) => (
                  <option key={index} value={item.id_agent_travel}>
                    {item.nama}
                  </option>
                ))}
                <option value="semua">Semua Agent Travel</option>
              </CSelect>
            </CFormGroup>

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
                        onClick={() => goToDetail(item.id_paket_wisata)}
                      >
                        Detail
                      </CButton>
                      <CButton
                        type="button"
                        color="warning"
                        onClick={() => goToEdit(item.id_paket_wisata)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        type="button"
                        color="danger"
                        onClick={() => handleDelete(item.id_paket_wisata)}
                      >
                        Hapus
                      </CButton>
                    </CButtonGroup>
                  </td>
                ),
                gambar: (item) => (
                  <td>
                    <CButton
                      color="secondary"
                      onClick={() => goToGambar(item.id_paket_wisata)}
                    >
                      Lihat
                    </CButton>
                  </td>
                ),

                harga: (item) => (
                  <td>
                    {parseInt(item.harga).toLocaleString("id", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                ),
                include: (item) => (
                  <td>
                    <CButton
                      color="secondary"
                      onClick={() => goToInclude(item.id_paket_wisata)}
                    >
                      Lihat
                    </CButton>
                  </td>
                ),
                exclude: (item) => (
                  <td>
                    <CButton
                      color="secondary"
                      onClick={() => goToExclude(item.id_paket_wisata)}
                    >
                      Lihat
                    </CButton>
                  </td>
                ),
                deskripsi: (item) => (
                  <td>
                    <CButton
                      color="secondary"
                      onClick={() => goToDeskripsi(item.id_paket_wisata)}
                    >
                      Lihat
                    </CButton>
                  </td>
                ),
              }}
            />
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

export default PaketWisata;
