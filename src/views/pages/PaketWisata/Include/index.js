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
// import data from "./data";
import { useHistory } from "react-router-dom";
import { LoadAnimationBlue } from "src/assets";
// import { getImage } from "src/context/DownloadImage";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getInclude } from "src/context/actions/Include/getInclude";
import { deleteInclude } from "src/context/actions/Include/deleteInclude";

// import data from "./data";

const MySwal = withReactContent(swal2);

const Include = ({ match }) => {
  const history = useHistory();
  const params = match.params;
  const [data, setData] = useState([]);

  const fields = ["no", "include", "aksi"];

  const goToTambah = () => {
    history.push(`/ngetrip/admin/paket-wisata/${params.id}/include/tambah`);
  };

  const goToEdit = (id) => {
    history.push(`/ngetrip/admin/paket-wisata/${params.id}/include/edit/${id}`);
  };

  const goToParent = () => {
    history.goBack();
  };

  useEffect(() => {
    // Get Include
    getInclude(params.id, setData);
  }, [params]);

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
        deleteInclude(params.id, id, setData);
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
          <h2>Include</h2>
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
                        onClick={() => goToEdit(item.id_include_wisata)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        type="button"
                        color="danger"
                        onClick={() => handleDelete(item.id_include_wisata)}
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

export default Include;
