import React, { useState, useEffect } from "react";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  CInput,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CButton,
  CForm,
  CLabel,
  CFormGroup,
  CRow,
  CCol,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { editDeskripsi } from "src/context/actions/Deskripsi/editDeskripsi";
import { getDeskripsiById } from "src/context/actions/Deskripsi/getDeskripsiById";

const MySwal = withReactContent(swal2);

const EditDeskripsi = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const goBackToParent = () => {
    history.goBack();
  };

  useEffect(() => {
    // Get deskripsi by ID
    getDeskripsiById(params.id, params.id_deskripsi, setData);
  }, [params]);

  // Inisialisasi State Formik
  const initState = {
    hari_ke: data ? data.hari_ke : "",
    keterangan: data ? data.keterangan : "",
  };

  // Fungsi untuk menampilkan alert success edit data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Edit Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/paket-wisata/${params.id}/deskripsi`);
    });
  };

  // Fungsi untuk menampilkan alert error edit data
  const showAlertError = (message) => {
    let err_message = "";

    for (const key in message) {
      err_message += `${message[key]}, `;
    }

    MySwal.fire({
      icon: "error",
      title: "Tambah Data Gagal",
      text: err_message,
    }).then((result) => {
      setLoading(false);
    });
  };

  // Setting validasi menggunakan yup & formik
  const validationSchema = Yup.object().shape({
    hari_ke: Yup.string().required("Hari ke harus diisi!"),
    keterangan: Yup.string().required("Keterangan harus diisi!"),
  });

  // Menangani value dari form submit
  const handleFormSubmit = (values) => {
    editDeskripsi(
      params.id,
      params.id_deskripsi,
      values,
      setLoading,
      showAlertSuccess,
      showAlertError
    );
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h2>Edit Data</h2>
          <CButton type="button" color="warning" onClick={goBackToParent}>
            Kembali
          </CButton>
        </CCardHeader>
        {data ? (
          <Formik
            initialValues={initState}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <CForm onSubmit={handleSubmit}>
                <CCardBody>
                  <CRow>
                    <CCol md="7">
                      <CFormGroup>
                        <CLabel>Hari Ke</CLabel>
                        <CInput
                          type="text"
                          id="hari_ke"
                          name="hari_ke"
                          placeholder="Masukkan hari ke berapa"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.hari_ke}
                          className={
                            errors.hari_ke && touched.hari_ke
                              ? "is-invalid"
                              : null
                          }
                        />
                        {errors.hari_ke && touched.hari_ke && (
                          <div className="invalid-feedback">
                            {errors.hari_ke}
                          </div>
                        )}
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Keterangan</CLabel>
                        <CInput
                          type="text"
                          id="keterangan"
                          name="keterangan"
                          placeholder="Masukkan keterangan paket wisata"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.keterangan}
                          className={
                            errors.keterangan && touched.keterangan
                              ? "is-invalid"
                              : null
                          }
                        />
                        {errors.keterangan && touched.keterangan && (
                          <div className="invalid-feedback">
                            {errors.keterangan}
                          </div>
                        )}
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    className="mr-2"
                    type="submit"
                    color="primary"
                    disabled={loading ? true : false}
                  >
                    {loading ? "Sedang menyimpan..." : "Simpan"}
                  </CButton>
                </CCardFooter>
              </CForm>
            )}
          </Formik>
        ) : (
          <div className="text-center my-3">Loading...</div>
        )}
      </CCard>
    </>
  );
};

export default EditDeskripsi;
