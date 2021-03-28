import React, { useState, useCallback, useEffect } from "react";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  CTextarea,
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
import { getAgentTravelById } from "src/context/actions/AgentTravel/getAgentTravelById";
import { editAgentTravel } from "src/context/actions/AgentTravel/editAgentTravel";

const MySwal = withReactContent(swal2);

const EditAgentTravel = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get agent travel by Id
    getAgentTravelById(params.id, setData);
  }, [params]);

  // Menangani preview input gambar setelah dipilih
  const handleSelectedFile = useCallback(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    handleSelectedFile();
  }, [handleSelectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const goBackToParent = () => {
    history.goBack();
  };

  // Inisialisasi State Formik
  const initState = {
    nama: data ? data.nama : "",
    alamat: data ? data.alamat : "",
    deskripsi: data ? data.deskripsi : "",
    gambar: undefined,
  };

  // Fungsi untuk menampilkan alert success edit data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Edit Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/agent-travel`);
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
  const SIZE_GAMBAR = 2048000;
  const EXT_GAMBAR = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama agent travel harus diisi!"),
    alamat: Yup.string().required("Alamat harus diisi!"),
    deskripsi: Yup.string().required("Deskripsi harus diisi!"),
    gambar: Yup.mixed()
      // .required("Gambar belum dipilih!")
      .test("size", "Kapasitas file maksimal 2 mb", (value) => {
        if (value) {
          return value && value.size <= SIZE_GAMBAR;
        }
        return true;
      })
      .test(
        "type",
        "Ekstensi yang diperbolehkan hanya jpg, jpeg, dan png!",
        (value) => {
          if (value) {
            return value && EXT_GAMBAR.includes(value.type);
          }
          return true;
        }
      ),
  });

  // Menangani value dari form submit
  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("alamat", values.alamat);
    formData.append("deskripsi", values.deskripsi);
    if (values.gambar) {
      formData.append("gambar", values.gambar);
    }

    for (var pair of formData.entries()) {
      console.log(pair);
    }

    editAgentTravel(
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
          <h2>Edit Data</h2>
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
            setFieldValue,
          }) => (
            <CForm onSubmit={handleSubmit}>
              <CCardBody>
                <CRow>
                  <CCol md="7">
                    <CFormGroup>
                      <CLabel>Nama Agent Travel</CLabel>
                      <CInput
                        type="text"
                        id="nama"
                        name="nama"
                        placeholder="Masukkan nama agent travel"
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
                      <CLabel>Alamat</CLabel>
                      <CInput
                        type="text"
                        id="alamat"
                        name="alamat"
                        placeholder="Masukkan alamat"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.alamat}
                        className={
                          errors.alamat && touched.alamat ? "is-invalid" : null
                        }
                      />
                      {errors.alamat && touched.alamat && (
                        <div className="invalid-feedback">{errors.alamat}</div>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Deskripsi</CLabel>
                      <CTextarea
                        id="deskripsi"
                        name="deskripsi"
                        placeholder="Masukkan deskripsi"
                        rows="6"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.deskripsi}
                        className={
                          errors.deskripsi && touched.deskripsi
                            ? "is-invalid"
                            : null
                        }
                      />
                      {errors.deskripsi && touched.deskripsi && (
                        <div className="invalid-feedback">
                          {errors.deskripsi}
                        </div>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Gambar</CLabel>
                      <CInput
                        type="file"
                        id="gambar"
                        name="gambar"
                        onChange={(e) => {
                          onSelectFile(e);
                          setFieldValue("gambar", e.target.files[0]);
                        }}
                        onBlur={handleBlur}
                        className={
                          errors.gambar && touched.gambar ? "is-invalid" : null
                        }
                      />
                      {errors.gambar && touched.gambar && (
                        <div className="invalid-feedback">{errors.gambar}</div>
                      )}
                      {preview && (
                        <img
                          className="mt-3"
                          width={200}
                          src={preview}
                          alt="gambar"
                        />
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

export default EditAgentTravel;
