import React, { useState, useEffect } from "react";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CDataTable,
  CButtonGroup,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { getAllKontak } from "src/context/actions/Kontak/getAllKontak";
import { getAgentTravelById } from "src/context/actions/AgentTravel/getAgentTravelById";
import { LoadAnimationBlue } from "src/assets";
import { deleteKontak } from "src/context/actions/Kontak/deleteKontak";

const MySwal = withReactContent(swal2);

const Kontak = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [data, setData] = useState([]);
  const [agentTravel, setAgentTravel] = useState("");
  const [loading, setLoading] = useState(false);

  const goBackToParent = () => {
    history.goBack();
  };

  const goToTambah = (id) => {
    history.push(`/ngetrip/admin/agent-travel/${id}/kontak/tambah`);
  };

  const goToEdit = (id) => {
    history.push(`/ngetrip/admin/agent-travel/${params.id}/kontak/${id}/edit`);
  };

  useEffect(() => {
    getAgentTravelById(params.id, setAgentTravel);
    getAllKontak(params.id, setData, setLoading);
  }, [params]);

  const fields = ["no", "nama", "kontak", "aksi"];

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
        deleteKontak(
          id,
          params.id,
          showAlertSuccessDelete,
          showAlertErrorDelete,
          setLoading,
          setData
        );
      }
    });
  };

  const showAlertSuccessDelete = () => {
    MySwal.fire({
      icon: "success",
      title: "Terhapus",
      text: "Data berhasil dihapus",
    });
  };

  const showAlertErrorDelete = () => {
    MySwal.fire({
      icon: "error",
      title: "Gagal",
      text: "Data berhasil dihapus",
    });
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <div className="title">
            <h2>Kontak Agent Travel</h2>
            <h4 className="font-weight-light">{agentTravel.nama}</h4>
          </div>
          <CButton
            color="warning"
            onClick={goBackToParent}
            style={{ height: "40px" }}
          >
            Kembali
          </CButton>
        </CCardHeader>
        <CCardBody>
          <div className="controller mb-3 d-flex justify-content-between">
            <CButton
              type="button"
              color="primary"
              onClick={() => goToTambah(params.id)}
            >
              Tambah Data Kontak
            </CButton>
          </div>
          {data.length > 0 ? (
            <CDataTable
              items={data}
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
                        color="warning"
                        onClick={() => goToEdit(item.id_kontak)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        type="button"
                        color="danger"
                        onClick={() => handleDelete(item.id_kontak)}
                      >
                        Hapus
                      </CButton>
                    </CButtonGroup>
                  </td>
                ),
              }}
            />
          ) : loading ? (
            <div className="text-center">
              <img src={LoadAnimationBlue} alt="load-animation" width={30} />
            </div>
          ) : (
            <CDataTable
              items={data}
              fields={fields}
              striped
              itemsPerPage={10}
              pagination
            />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Kontak;
