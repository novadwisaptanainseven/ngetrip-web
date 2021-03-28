import React, { useState, useEffect } from "react";

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
  CSelect,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { getPaketWisataById } from "src/context/actions/PaketWisata/getPaketWisataById";
import { getSelectAgentTravel } from "src/context/actions/AgentTravel/getSelectAgentTravel";
import { editPaketWisata } from "src/context/actions/PaketWisata/editPaketWisata";

const MySwal = withReactContent(swal2);

const EditPaketWisata = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [agentTravel, setAgentTravel] = useState([]);
  const [data, setData] = useState("");
  const [formatHarga, setFormatHarga] = useState("");

  const goBackToParent = () => {
    history.goBack();
  };

  const convertToCurrency = (harga) => {
    let formattedHarga = parseInt(harga).toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
    if (formattedHarga !== "RpNaN") {
      setFormatHarga(formattedHarga);
    } else {
      setFormatHarga("");
    }
  };

  useEffect(() => {
    if (data) {
      convertToCurrency(data.harga);
    }
  }, [data]);

  useEffect(() => {
    // Get paket wisata by Id
    getPaketWisataById(params.id, setData);
    // Get agent travel
    getSelectAgentTravel(setAgentTravel);
  }, [params]);

  // Inisialisasi State Formik
  const initState = {
    id_agent_travel: data ? data.id_agent_travel : "",
    nama_paket_wisata: data ? data.nama_paket_wisata : "",
    harga: data ? data.harga : "",
    meeting_point: data ? data.meeting_point : "",
    satuan: data ? data.satuan : "",
  };

  // Fungsi untuk menampilkan alert success edit data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Edit Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/paket-wisata`);
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
    id_agent_travel: Yup.string().required("Agent travel harus diisi!"),
    nama_paket_wisata: Yup.string().required("Nama paket wisata harus diisi!"),
    harga: Yup.number()
      .typeError("Harga harus berupa bilangan numerik")
      .integer("Harga harus berupa bilangan numerik")
      .required("Harga harus diisi!"),
    meeting_point: Yup.string().required("Meeting point harus diisi!"),
    satuan: Yup.string().required("Satuan harus diisi!"),
  });

  // Menangani value dari form submit
  const handleFormSubmit = (values) => {
    console.log(values);

    editPaketWisata(
      params.id,
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
                        <CLabel>Agent Travel</CLabel>
                        <CSelect
                          disabled
                          id="id_agent_travel"
                          name="id_agent_travel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.id_agent_travel}
                        >
                          <option value="">-- Pilih Agent Travel --</option>
                          {agentTravel.map((item, index) => (
                            <option key={index} value={item.id_agent_travel}>
                              {item.nama}
                            </option>
                          ))}
                        </CSelect>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Nama Paket Wisata</CLabel>
                        <CInput
                          type="text"
                          id="nama_paket_wisata"
                          name="nama_paket_wisata"
                          placeholder="Masukkan nama paket wisata"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nama_paket_wisata}
                          className={
                            errors.nama_paket_wisata &&
                            touched.nama_paket_wisata
                              ? "is-invalid"
                              : null
                          }
                        />
                        {errors.nama_paket_wisata &&
                          touched.nama_paket_wisata && (
                            <div className="invalid-feedback">
                              {errors.nama_paket_wisata}
                            </div>
                          )}
                      </CFormGroup>
                      <CRow>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Harga</CLabel>
                            <CInput
                              id="harga"
                              name="harga"
                              placeholder="Masukkan harga"
                              onChange={handleChange}
                              onKeyUp={(e) => convertToCurrency(e.target.value)}
                              onBlur={handleBlur}
                              value={values.harga}
                              className={
                                errors.harga && touched.harga
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <div>{formatHarga}</div>
                            {errors.harga && touched.harga && (
                              <div className="invalid-feedback">
                                {errors.harga}
                              </div>
                            )}
                          </CFormGroup>
                        </CCol>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Satuan</CLabel>
                            <CInput
                              id="satuan"
                              name="satuan"
                              placeholder="Masukkan satuan"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.satuan}
                              className={
                                errors.satuan && touched.satuan
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            {errors.satuan && touched.satuan && (
                              <div className="invalid-feedback">
                                {errors.satuan}
                              </div>
                            )}
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CFormGroup>
                        <CLabel>Meeting Point</CLabel>
                        <CTextarea
                          id="meeting_point"
                          name="meeting_point"
                          placeholder="Masukkan meeting point"
                          rows="6"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.meeting_point}
                          className={
                            errors.meeting_point && touched.meeting_point
                              ? "is-invalid"
                              : null
                          }
                        />
                        {errors.meeting_point && touched.meeting_point && (
                          <div className="invalid-feedback">
                            {errors.meeting_point}
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
                  <CButton type="reset" color="danger">
                    Reset
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

export default EditPaketWisata;
