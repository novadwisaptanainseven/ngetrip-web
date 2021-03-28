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
import { getExcludeById } from "src/context/actions/Exclude/getExcludeById";
import { editExclude } from "src/context/actions/Exclude/editExclude";

const MySwal = withReactContent(swal2);

const EditExclude = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const goBackToParent = () => {
    history.goBack();
  };

  // Inisialisasi State Formik
  const initState = {
    exclude: data ? data.exclude : "",
  };

  useEffect(() => {
    // Get Exclude by ID
    getExcludeById(params.id, params.id_exclude, setData);
  }, [params]);

  // Fungsi untuk menampilkan alert success edit data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Edit Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/paket-wisata/${params.id}/exclude`);
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

  // Setting validasi menggunakan yup & formik
  const validationSchema = Yup.object().shape({
    exclude: Yup.string().required("Exclude harus diisi!"),
  });

  // Menangani value dari form submit
  const handleFormSubmit = (values) => {
    editExclude(
      params.id,
      params.id_exclude,
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
                        <CLabel>Exclude</CLabel>
                        <CInput
                          type="text"
                          id="exclude"
                          name="exclude"
                          placeholder="Masukkan exclude paket wisata"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.exclude}
                          className={
                            errors.exclude && touched.exclude
                              ? "is-invalid"
                              : null
                          }
                        />
                        {errors.exclude && touched.exclude && (
                          <div className="invalid-feedback">
                            {errors.exclude}
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

export default EditExclude;
