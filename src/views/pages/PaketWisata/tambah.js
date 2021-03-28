import React, { useState, useEffect, useCallback } from "react";

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
import CIcon from "@coreui/icons-react";
import { cilPlus, cilMinus } from "@coreui/icons";
import IncludeComponent from "./IncludeComponent";
import ExcludeComponent from "./ExcludeComponent";
import DeskripsiComponent from "./DeskripsiComponent";
import { getSelectAgentTravel } from "src/context/actions/AgentTravel/getSelectAgentTravel";
import { insertPaketWisata } from "src/context/actions/PaketWisata/insertPaketWisata";

const MySwal = withReactContent(swal2);

const TambahPaketWisata = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [include, setInclude] = useState([]);
  const [exclude, setExclude] = useState([]);
  const [deskripsi, setDeskripsi] = useState([]);
  const [agentTravel, setAgentTravel] = useState([]);
  const [formatHarga, setFormatHarga] = useState("");

  const goBackToParent = () => {
    history.goBack();
  };

  useEffect(() => {
    // Get agent travel
    getSelectAgentTravel(setAgentTravel);
  }, []);

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

  // Handle tambah include untuk disimpan ke state array include
  const handleTambahInclude = (value) => {
    setInclude([...include, value]);
  };

  // Handle hapus include
  const handleHapusInclude = () => {
    include.pop();
    setInclude([...include]);
  };

  // Handle tambah exclude untuk disimpan ke state array exclude
  const handleTambahExclude = (value) => {
    setExclude([...exclude, value]);
  };

  // Handle hapus include
  const handleHapusExclude = () => {
    exclude.pop();
    setExclude([...exclude]);
  };

  // Handle tambah deskripsi untuk disimpan ke state array deskripsi
  const handleTambahDeskripsi = (value) => {
    setDeskripsi([...deskripsi, value]);
  };

  // Handle hapus deskripsi
  const handleHapusDeskripsi = () => {
    deskripsi.pop();
    setDeskripsi([...deskripsi]);
  };

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

  // Inisialisasi State Formik
  const initState = {
    id_agent_travel: "",
    nama_paket_wisata: "",
    harga: "",
    meeting_point: "",
    satuan: "",
    hari_ke: "",
    keterangan: "",
    include: "",
    exclude: "",
  };

  // Fungsi untuk menampilkan alert success tambah data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Tambah Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/paket-wisata`);
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
      title: "Tambah Data Gagal",
      text: err_message,
    }).then((result) => {
      setLoading(false);
    });
  };

  // Setting validasi menggunakan yup & formik
  const SIZE_GAMBAR = 2048000;
  const EXT_GAMBAR = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    id_agent_travel: Yup.string().required("Agent travel harus diisi!"),
    nama_paket_wisata: Yup.string().required("Nama paket wisata harus diisi!"),
    harga: Yup.number()
      .typeError("Harga harus berupa bilangan numerik")
      .integer("Harga harus berupa bilangan numerik")
      .required("Harga harus diisi!"),
    meeting_point: Yup.string().required("Meeting point harus diisi!"),
    satuan: Yup.string().required("Satuan harus diisi!"),
    hari_ke: Yup.string().required("Hari ke harus diisi!"),
    keterangan: Yup.string().required("Keterangan harus diisi!"),
    include: Yup.string().required("Include harus diisi!"),
    exclude: Yup.string().required("Exclude harus diisi!"),
    gambar: Yup.mixed()
      .required("Gambar belum dipilih!")
      .test(
        "size",
        "Kapasitas file maksimal 2 mb",
        (value) => value && value.size <= SIZE_GAMBAR
      )
      .test(
        "type",
        "Ekstensi yang diperbolehkan hanya jpg, jpeg, dan png!",
        (value) => value && EXT_GAMBAR.includes(value.type)
      ),
  });

  // Menangani value dari form submit
  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("nama_paket_wisata", values.nama_paket_wisata);
    formData.append("id_agent_travel", values.id_agent_travel);
    formData.append("harga", values.harga);
    formData.append("meeting_point", values.meeting_point);
    formData.append("gambar", values.gambar);
    formData.append("satuan", values.satuan);
    if (include.length > 0) {
      include.forEach((item, index) => {
        formData.append(`include[${index}]`, item);
      });
    }
    if (exclude.length > 0) {
      exclude.forEach((item, index) => {
        formData.append(`exclude[${index}]`, item);
      });
    }
    if (deskripsi.length > 0) {
      deskripsi.forEach((item, index) => {
        formData.append(`deskripsi[${index}][hari_ke]`, item.hari_ke);
        formData.append(`deskripsi[${index}][keterangan]`, item.keterangan);
      });
    }

    for (var pair of formData.entries()) {
      console.log(pair);
    }
    insertPaketWisata(formData, setLoading, showAlertSuccess, showAlertError);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h2>Tambah Data</h2>
          <CButton type="button" color="warning" onClick={goBackToParent}>
            Kembali
          </CButton>
        </CCardHeader>
        <Formik
          initialValues={initState}
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
            setFieldValue,
          }) => (
            <CForm onSubmit={handleSubmit}>
              <CCardBody>
                <CRow>
                  <CCol md="7">
                    <CFormGroup>
                      <CLabel>Agent Travel</CLabel>
                      <CSelect
                        id="id_agent_travel"
                        name="id_agent_travel"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.id_agent_travel}
                        className={
                          errors.id_agent_travel && touched.id_agent_travel
                            ? "is-invalid"
                            : null
                        }
                      >
                        <option value="">-- Pilih Agent Travel --</option>
                        {agentTravel.map((item, index) => (
                          <option key={index} value={item.id_agent_travel}>
                            {item.nama}
                          </option>
                        ))}
                      </CSelect>
                      {errors.id_agent_travel && touched.id_agent_travel && (
                        <div className="invalid-feedback">
                          {errors.id_agent_travel}
                        </div>
                      )}
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
                          errors.nama_paket_wisata && touched.nama_paket_wisata
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
                            type="text"
                            id="harga"
                            name="harga"
                            placeholder="Masukkan harga"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyUp={(e) => convertToCurrency(e.target.value)}
                            value={values.harga}
                            className={
                              errors.harga && touched.harga
                                ? "is-invalid"
                                : null
                            }
                          />
                          <div className="mt-1">{formatHarga}</div>
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
                          width="100%"
                          src={preview}
                          alt="gambar"
                        />
                      )}
                    </CFormGroup>

                    <CCard>
                      <CCardHeader className="bg-dark">
                        Data Deskripsi
                      </CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol>
                            <CFormGroup>
                              <CLabel>Hari Ke</CLabel>
                              <CInput
                                id="hari_ke"
                                name="hari_ke"
                                type="text"
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
                          </CCol>
                          <CCol>
                            <CFormGroup>
                              <CLabel>Keterangan</CLabel>
                              <CInput
                                id="keterangan"
                                name="keterangan"
                                type="text"
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

                        <CButton
                          type="button"
                          color="success"
                          className="mr-2"
                          onClick={() =>
                            handleTambahDeskripsi({
                              hari_ke: values.hari_ke,
                              keterangan: values.keterangan,
                            })
                          }
                          disabled={
                            !values.hari_ke || !values.keterangan ? true : false
                          }
                        >
                          <CIcon content={cilPlus} size="lg" />
                        </CButton>
                        <CButton
                          type="button"
                          color="danger"
                          onClick={handleHapusDeskripsi}
                        >
                          <CIcon content={cilMinus} size="lg" color="white" />
                        </CButton>
                        <DeskripsiComponent data={deskripsi} />
                      </CCardBody>
                    </CCard>
                  </CCol>
                  <CCol>
                    <CCard>
                      <CCardHeader className="bg-dark">
                        Data Include
                      </CCardHeader>
                      <CCardBody>
                        <CFormGroup>
                          <CInput
                            id="include"
                            name="include"
                            type="text"
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
                        <CButton
                          type="button"
                          color="success"
                          className="mr-2"
                          onClick={() => handleTambahInclude(values.include)}
                          disabled={!values.include ? true : false}
                        >
                          <CIcon content={cilPlus} size="lg" />
                        </CButton>
                        <CButton
                          type="button"
                          color="danger"
                          onClick={handleHapusInclude}
                        >
                          <CIcon content={cilMinus} size="lg" color="white" />
                        </CButton>
                        <IncludeComponent data={include} />
                      </CCardBody>
                    </CCard>

                    <CCard>
                      <CCardHeader className="bg-dark">
                        Data Exclude
                      </CCardHeader>
                      <CCardBody>
                        <CFormGroup>
                          <CInput
                            id="exclude"
                            name="exclude"
                            type="text"
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
                        <CButton
                          type="button"
                          color="success"
                          className="mr-2"
                          onClick={() => handleTambahExclude(values.exclude)}
                          disabled={!values.exclude ? true : false}
                        >
                          <CIcon content={cilPlus} size="lg" />
                        </CButton>
                        <CButton
                          type="button"
                          color="danger"
                          onClick={handleHapusExclude}
                        >
                          <CIcon content={cilMinus} size="lg" color="white" />
                        </CButton>
                        <ExcludeComponent data={exclude} />
                      </CCardBody>
                    </CCard>
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

export default TambahPaketWisata;
