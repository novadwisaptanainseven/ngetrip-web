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
import { getIncludeById } from "src/context/actions/Include/getIncludeById";
import { editInclude } from "src/context/actions/Include/editInclude";

const MySwal = withReactContent(swal2);

const EditInclude = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const goBackToParent = () => {
    history.goBack();
  };

  useEffect(() => {
    // Get include by id
    getIncludeById(params.id, params.id_include, setData);
  }, [params]);

  // Inisialisasi State Formik
  const initState = {
    include: data ? data.include : "",
  };

  // Fungsi untuk menampilkan alert success edit data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Edit Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/paket-wisata/${params.id}/include`);
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
      title: "Edit Data Gagal",
      text: err_message,
    }).then((result) => {
      setLoading(false);
    });
  };

  // Setting validasi menggunakan yup & formik
  const validationSchema = Yup.object().shape({
    include: Yup.string().required("Include harus diisi!"),
  });

  // Menangani value dari form submit
  const handleFormSubmit = (values) => {
    editInclude(
      params.id,
      params.id_include,
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
                        <CLabel>Include</CLabel>
                        <CInput
                          type="text"
                          id="include"
                          name="include"
                          placeholder="Masukkan include paket wisata"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.include}
                          className={
                            errors.include && touched.include
                              ? "is-invalid"
                              : null
                          }
                        />
                        {errors.include && touched.include && (
                          <div className="invalid-feedback">
                            {errors.include}
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

export default EditInclude;
