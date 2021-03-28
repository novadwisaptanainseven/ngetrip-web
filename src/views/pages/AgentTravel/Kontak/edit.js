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
import { editKontak } from "src/context/actions/Kontak/editKontak";
import { getKontakById } from "src/context/actions/Kontak/getKontakById";

const MySwal = withReactContent(swal2);

const EditKontak = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const goBackToParent = () => {
    history.goBack();
  };

  useEffect(() => {
    // Get Kontak by ID
    getKontakById(params.id_kontak, params.id_agent_travel, setData);
  }, [params]);

  // Inisialisasi State Formik
  const initState = {
    nama: data ? data.nama : "",
    kontak: data ? data.kontak : "",
  };

  // Fungsi untuk menampilkan alert success edit data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Edit Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(
        `/ngetrip/admin/agent-travel/${params.id_agent_travel}/kontak`
      );
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
      title: "Edit Data Gagal",
      text: err_message,
    }).then((result) => {
      setLoading(false);
    });
  };

  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama kontak harus diisi!"),
    kontak: Yup.string().required("Kontak harus diisi!"),
  });

  // Menangani value dari form submit
  const handleFormSubmit = (values) => {
    editKontak(
      params.id_agent_travel,
      params.id_kontak,
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
          <h2>Edit Data Kontak</h2>
          <CButton type="button" color="warning" onClick={goBackToParent}>
            Kembali
          </CButton>
        </CCardHeader>
        <Formik
          initialValues={initState}
          validationSchema={validationSchema}
          enableReinitialize={true}
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
                      <CLabel>Nama Kontak</CLabel>
                      <CInput
                        type="text"
                        id="nama"
                        name="nama"
                        placeholder="Masukkan nama kontak"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nama}
                        className={
                          errors.nama && touched.nama ? "is-invalid" : null
                        }
                      />
                      {errors.nama && touched.nama && (
                        <div className="invalid-feedback">{errors.nama}</div>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Kontak</CLabel>
                      <CInput
                        type="text"
                        id="kontak"
                        name="kontak"
                        placeholder="Masukkan kontak"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.kontak}
                        className={
                          errors.kontak && touched.kontak ? "is-invalid" : null
                        }
                      />
                      {errors.kontak && touched.kontak && (
                        <div className="invalid-feedback">{errors.kontak}</div>
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
                <CButton type="reset" color="danger">
                  Reset
                </CButton>
              </CCardFooter>
            </CForm>
          )}
        </Formik>
      </CCard>
    </>
  );
};

export default EditKontak;
