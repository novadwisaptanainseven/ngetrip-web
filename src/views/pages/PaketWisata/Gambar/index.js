import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CCardFooter,
  CButtonGroup,
  CButton,
  CForm,
  CCol,
  CFormGroup,
  CInput,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { LoadAnimationBlue, SampleImage } from "src/assets";
// import { getImage } from "src/context/DownloadImage";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getGambar } from "src/context/actions/Gambar/getGambar";
import { deleteGambar } from "src/context/actions/Gambar/deleteGambar";
import { getImage } from "src/context/DownloadImage";
import { insertGambar } from "src/context/actions/Gambar/insertGambar";
import { editStatusGambar } from "src/context/actions/Gambar/editStatusGambar";
// import data from "./data";

const MySwal = withReactContent(swal2);

const Gambar = ({ match }) => {
  const history = useHistory();
  const params = match.params;
  const fields = ["no", "gambar", "status", "aksi"];
  const [data, setData] = useState([]);
  const [gambar, setGambar] = useState("");
  const [loading, setLoading] = useState(false);

  const goToParent = () => {
    history.goBack();
  };

  useEffect(() => {
    // Get Gambar
    getGambar(params.id, setData);
  }, [params]);

  // Fungsi untuk menampilkan alert success tambah data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Upload Gambar Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/paket-wisata/${params.id}/gambar`);
    });
  };

  // Fungsi untuk menampilkan alert error tambah data
  const showAlertError = (message) => {
    let err_message = "";

    for (const key in message) {
      err_message += `${message[key]}, `;
    }

    MySwal.fire({
      icon: "error",
      title: "Upload Gambar Gagal",
      text: err_message,
    }).then((result) => {
      setLoading(false);
    });
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
        deleteGambar(params.id, id, setData);
        MySwal.fire({
          icon: "success",
          title: "Terhapus",
          text: "Data berhasil dihapus",
        });
      }
    });
  };

  // Menangani proses update status utama gambar
  const handleStatusGambar = (id_gambar, statusGambar) => {
    if (statusGambar === 0 || statusGambar === "0") {
      let updateStatus = 1;

      MySwal.fire({
        icon: "warning",
        title: "Jadikan Gambar Utama ?",
        text: "Jika yakin, klik YA",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "YA",
      }).then((res) => {
        if (res.isConfirmed) {
          // Update status utama pada gambar
          editStatusGambar(params.id, id_gambar, setData, updateStatus);
          MySwal.fire({
            icon: "success",
            title: "Gambar ini telah diutamakan",
          });
        }
      });
    }
  };

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("file_gambar", gambar);

    insertGambar(
      params.id,
      formData,
      setLoading,
      showAlertSuccess,
      showAlertError
    );
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h2>Gambar</h2>
          <CButton color="warning" onClick={goToParent}>
            Kembali
          </CButton>
        </CCardHeader>
        <CCardBody>
          <div className="controller mb-3 d-flex justify-content-between">
            <div>
              <CForm>
                <CFormGroup row className="m-0" style={{ width: "800px" }}>
                  <CCol className="pr-1">
                    <CInput
                      type="file"
                      id="gambar"
                      name="gambar"
                      onChange={(e) => setGambar(e.target.files[0])}
                    />
                  </CCol>
                  <CCol className="pl-0">
                    <CButton
                      type="button"
                      color="primary"
                      onClick={handleFormSubmit}
                    >
                      {loading ? "Sedang mengunggah..." : "Unggah"}
                    </CButton>
                  </CCol>
                </CFormGroup>
              </CForm>
            </div>
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
                gambar: (item) => (
                  <td>
                    <img
                      width={200}
                      src={getImage(item.file_gambar)}
                      alt="gambar-paket-wisata"
                      className="img-thumbnail"
                    />
                  </td>
                ),
                status: (item) => (
                  <td>
                    {item.status === 1 ? (
                      <CButton type="button" color="success" disabled>
                        Utama
                      </CButton>
                    ) : (
                      <CButton
                        type="button"
                        color="dark"
                        onClick={() =>
                          handleStatusGambar(item.id_gambar_wisata, item.status)
                        }
                      >
                        Jadikan Utama
                      </CButton>
                    )}
                  </td>
                ),
                aksi: (item) => (
                  <td>
                    <CButtonGroup>
                      <CButton
                        type="button"
                        color="danger"
                        onClick={() => handleDelete(item.id_gambar_wisata)}
                        disabled={item.status === 1 ? true : false}
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

export default Gambar;
