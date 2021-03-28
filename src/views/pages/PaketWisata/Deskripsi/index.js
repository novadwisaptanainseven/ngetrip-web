import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CCardFooter,
  CButtonGroup,
  CButton,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { LoadAnimationBlue } from "src/assets";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import data from "./data";
import { getDeskripsi } from "src/context/actions/Deskripsi/getDeskripsi";
import { deleteDeskripsi } from "src/context/actions/Deskripsi/deleteDeskripsi";

const MySwal = withReactContent(swal2);

const Deskripsi = ({ match }) => {
  const history = useHistory();
  const params = match.params;
  const [data, setData] = useState([]);
  const fields = ["no", "hari_ke", "keterangan", "aksi"];

  const goToTambah = () => {
    history.push(`/ngetrip/admin/paket-wisata/${params.id}/deskripsi/tambah`);
  };

  const goToEdit = (id) => {
    history.push(
      `/ngetrip/admin/paket-wisata/${params.id}/deskripsi/edit/${id}`
    );
  };

  const goToParent = () => {
    history.goBack();
  };

  useEffect(() => {
    // Get paket wisata
    getDeskripsi(params.id, setData);
  }, []);

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
        deleteDeskripsi(params.id, id, setData);
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
          <h2>Deskripsi</h2>
        </CCardHeader>
        <CCardBody>
          <div className="controller mb-3 d-flex justify-content-between">
            <CButton type="button" color="primary" onClick={goToTambah}>
              Tambah Data
            </CButton>

            <CButton type="button" color="warning" onClick={goToParent}>
              Kembali
            </CButton>
          </div>
          {!data.length > 0 ? (
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
              scopedSlots={{
                aksi: (item) => (
                  <td>
                    <CButtonGroup>
                      <CButton
                        type="button"
                        color="warning"
                        onClick={() => goToEdit(item.id_deskripsi_wisata)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        type="button"
                        color="danger"
                        onClick={() => handleDelete(item.id_deskripsi_wisata)}
                      >
                        Hapus
                      </CButton>
                    </CButtonGroup>
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

export default Deskripsi;
