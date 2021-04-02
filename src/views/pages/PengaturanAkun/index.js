import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";

import * as Yup from "yup";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useContext } from "react";
import { GlobalContext } from "src/context/Provider";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { updateUser } from "src/context/actions/Auth";

const MySwal = withReactContent(swal2);

const PengaturanAkun = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { userState, userDispatch } = useContext(GlobalContext);
  const { data } = userState;

  // Inisialisasi State Formik
  const initState = {
    name: data ? data.name : "",
    username: data ? data.username : "",
    password_lama: "",
    password_baru: "",
    konf_password: "",
  };

  // Fungsi untuk menampilkan alert success edit data
  const showAlertSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Edit Akun Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push(`/ngetrip/admin/pengaturan-akun`);
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
      title: "Edit Akun Gagal",
      text: err_message,
    }).then((result) => {
      setLoading(false);
    });
  };

  // Setting validasi form
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama harus diisi!"),
    username: Yup.string().required("Username harus diisi!"),
    password_baru: Yup.string().oneOf(
      [Yup.ref("konf_password"), null],
      "Konfirmasi password tidak sesuai"
    ),
    konf_password: Yup.string().oneOf(
      [Yup.ref("password_baru"), null],
      "Konfirmasi password tidak sesuai"
    ),
  });

  // Menangani value setelah form di-submit
  const handleFormSubmit = (values) => {
    console.log(values);

    updateUser(
      data.id,
      values,
      userDispatch,
      setLoading,
      showAlertSuccess,
      showAlertError
    );
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h2>Pengaturan Akun</h2>
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
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel>Nama</CLabel>
                      <CInput
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan nama"
                        className={
                          errors.name && touched.name ? "is-invalid" : ""
                        }
                      />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Username</CLabel>
                      <CInput
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan username"
                        className={
                          errors.username && touched.username
                            ? "is-invalid"
                            : ""
                        }
                      />
                      {errors.username && touched.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )}
                    </CFormGroup>
                    <hr />
                    <h5>Isi form di bawah ini jika ingin mengganti password</h5>
                    <CFormGroup>
                      <CLabel>Password Lama</CLabel>
                      <CInput
                        type="password"
                        id="password_lama"
                        name="password_lama"
                        value={values.password_lama || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan password lama"
                        className={
                          errors.password_lama && touched.password_lama
                            ? "is-invalid"
                            : ""
                        }
                      />
                      {errors.password_lama && touched.password_lama && (
                        <div className="invalid-feedback">
                          {errors.password_lama}
                        </div>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Password Baru</CLabel>
                      <CInput
                        type="password"
                        id="password_baru"
                        name="password_baru"
                        value={values.password_baru || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan password baru"
                        className={
                          errors.password_baru && touched.password_baru
                            ? "is-invalid"
                            : ""
                        }
                      />
                      {errors.password_baru && touched.password_baru && (
                        <div className="invalid-feedback">
                          {errors.password_baru}
                        </div>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Konfirmasi Password</CLabel>
                      <CInput
                        type="password"
                        id="konf_password"
                        name="konf_password"
                        value={values.konf_password || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan konfirmasi password"
                        className={
                          errors.konf_password && touched.konf_password
                            ? "is-invalid"
                            : ""
                        }
                      />
                      {errors.konf_password && touched.konf_password && (
                        <div className="invalid-feedback">
                          {errors.konf_password}
                        </div>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CButton
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
      </CCard>
    </>
  );
};

export default PengaturanAkun;
