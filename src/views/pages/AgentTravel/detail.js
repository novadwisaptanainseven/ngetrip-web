import React, { useState, useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CButton,
  CForm,
  CRow,
  CCol,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
// import { LoadAnimationBlue } from "src/assets";
import { getAgentTravelById } from "src/context/actions/AgentTravel/getAgentTravelById";
import { getImage } from "src/context/DownloadImage";
import { getPaketWisataByAgentTravel } from "src/context/actions/PaketWisata/getPaketWisataByAgentTravel";
import CIcon from "@coreui/icons-react";
import { cilWarning } from "@coreui/icons";

const DetailAgentTravel = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const [dataAgentTravel, setDataAgentTravel] = useState("");
  const [dataPaketWisata, setDataPaketWisata] = useState([]);

  useEffect(() => {
    // Get Agent Travel by Id
    getAgentTravelById(params.id, setDataAgentTravel);
    // Get Paket Wisata by Agent Travel
    getPaketWisataByAgentTravel(params.id, setDataPaketWisata);
  }, [params]);

  const goBackToParent = () => {
    history.goBack();
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h2>Detail Data</h2>
          <CButton type="button" color="warning" onClick={goBackToParent}>
            Kembali
          </CButton>
        </CCardHeader>
        <CForm>
          <CCardBody>
            <CRow>
              <CCol md="6">
                <table className="table table-sm table-striped">
                  <tbody>
                    <tr>
                      <th>Agent Travel</th>
                    </tr>
                    <tr>
                      <td>{dataAgentTravel.nama}</td>
                    </tr>
                    <tr>
                      <th>Alamat</th>
                    </tr>
                    <tr>
                      <td>{dataAgentTravel.alamat}</td>
                    </tr>
                    <tr>
                      <th>Deskripsi</th>
                    </tr>
                    <tr>
                      <td className="text-justify">
                        {dataAgentTravel.deskripsi}
                      </td>
                    </tr>
                    <tr>
                      <th>Gambar</th>
                    </tr>
                    <tr>
                      <td>
                        <img
                          className="mt-1"
                          style={{ width: "100%" }}
                          src={
                            dataAgentTravel
                              ? getImage(dataAgentTravel.gambar)
                              : "."
                          }
                          alt={dataAgentTravel.gambar}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCol>
              <CCol md="6">
                <CCard>
                  <CCardBody>
                    <h4 className="mb-4">Daftar Paket Wisata</h4>

                    {dataPaketWisata.length > 0 ? (
                      dataPaketWisata.map((item, index) => (
                        <div key={index} className="card mb-3 shadow">
                          <div className="row no-gutters">
                            <div
                              className="col-md-4"
                              // style={{ overflow: "hidden" }}
                            >
                              <img
                                src={getImage(item.gambar)}
                                alt="..."
                                style={{
                                  objectFit: "cover",
                                  height: "100%",
                                  width: "100%",
                                }}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title">
                                  {item.nama_paket_wisata}
                                </h5>
                                <ul className="m-0 pl-4">
                                  <li>
                                    <b>Meeting Point: </b> {item.meeting_point}
                                  </li>
                                  <li>
                                    <b>Harga: </b>{" "}
                                    {item.harga.toLocaleString("id", {
                                      style: "currency",
                                      currency: "IDR",
                                    })}{" "}
                                    / {item.satuan}
                                  </li>
                                </ul>
                                <CButton
                                  className="mt-3 mr-2"
                                  color="secondary"
                                >
                                  Edit
                                </CButton>
                                <CButton className="mt-3" color="danger">
                                  Hapus
                                </CButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-danger">
                        <CIcon
                          content={cilWarning}
                          className="mb-1"
                          size="xl"
                        />{" "}
                        <br />
                        Belum memiliki paket wisata
                      </div>
                    )}
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="button" color="info">
                      Tambah Paket Wisata
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CForm>
      </CCard>
    </>
  );
};

export default DetailAgentTravel;
