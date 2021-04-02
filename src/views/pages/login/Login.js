import React, { useContext, useState, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "src/context/Provider";
import { checkToken } from "src/helpers/checkToken";
import { CLEAN_UP } from "src/context/actionTypes";
import { login } from "src/context/actions/Auth";
import { cilInfo } from "@coreui/icons";

const Login = () => {
  const history = useHistory();
  const { loginState, loginDispatch } = useContext(GlobalContext);
  const { data, loading, error } = loginState;
  const [tokenAlert, setTokenAlert] = useState(true);

  useEffect(() => {
    if (tokenAlert) {
      checkToken(history);
    }

    // Jika berhasil login, redirect ke dashboard
    if (data) {
      window.location.href = "/ngetrip/admin/dashboard";
    }

    // Ketika komponen di unmount
    return () => {
      loginDispatch({
        type: CLEAN_UP,
      });
    };
  }, [data, tokenAlert, loginDispatch, history]);

  // Inisialisasi state untuk handle login
  const initState = {
    username: "",
    password: "",
  };

  // Setting validasi menggunakan Yup & Formik
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username harus diisi"),
    password: Yup.string().required("Password harus diisi"),
  });

  const handleFormSubmit = (values) => {
    // Lakukan proses login
    setTokenAlert(false);
    login(values, loginDispatch);
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <h1 className="text-center mb-4">
              NgetripYuk{" "}
              <span className="font-weight-normal">Administrator</span>
            </h1>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Login</h1>
                  <p className="text-muted">Login sebagai Administrator</p>
                  {/* Alert Error */}
                  {error && (
                    <CAlert closeButton className="alert-danger" fade>
                      <span className="alert-inner--icon">
                        <CIcon content={cilInfo} color="white" />
                      </span>{" "}
                      <span className="alert-inner--text ml-2">{error} !</span>
                    </CAlert>
                  )}
                  {/* End of Alert Error */}
                  <Formik
                    initialValues={initState}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleFormSubmit(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      handleChange,
                      handleBlur,
                    }) => (
                      <CForm onSubmit={handleSubmit}>
                        <CInputGroup
                          className={`mb-1 ${
                            errors.username && touched.username
                              ? "input-error"
                              : null
                          }`}
                        >
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon
                                name="cil-user"
                                className={
                                  errors.username && touched.username
                                    ? "text-danger"
                                    : null
                                }
                              />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Username"
                            autoComplete="username"
                            value={values.username}
                          />
                        </CInputGroup>
                        {errors.username && touched.username && (
                          <div className="text-danger text-error">
                            {errors.username}
                          </div>
                        )}
                        <CInputGroup
                          className={`mt-3 mb-1 ${
                            errors.password && touched.password
                              ? "input-error"
                              : null
                          }`}
                        >
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon
                                name="cil-lock-locked"
                                className={
                                  errors.password && touched.password
                                    ? "text-danger"
                                    : null
                                }
                              />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                            autoComplete="current-password"
                            value={values.password}
                          />
                        </CInputGroup>
                        {errors.password && touched.password && (
                          <div className="text-danger text-error">
                            {errors.password}
                          </div>
                        )}
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4 mt-4"
                              type="submit"
                              disabled={loading ? true : false}
                            >
                              {loading ? "Harap tunggu..." : "Login"}
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
