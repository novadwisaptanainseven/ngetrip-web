import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CDataTable,
  CCardFooter,
} from "@coreui/react";
import dataInclude from "./Include/data";
import dataExclude from "./Exclude/data";
import dataDeskripsi from "./Deskripsi/data";
import { SampleImage } from "src/assets";
import { getPaketWisataById } from "src/context/actions/PaketWisata/getPaketWisataById";
import { getImage } from "src/context/DownloadImage";

const DetailPaketWisata = ({ match }) => {
  const params = match.params;
  const history = useHistory();
  const include = dataInclude;
  const exclude = dataExclude;
  const deskripsi = dataDeskripsi;
  const [data, setData] = useState("");
  const goBackToParent = () => {
    history.goBack();
  };

  const goToGambar = () => {
    history.push(`/ngetrip/admin/paket-wisata/${params.id}/gambar`);
  };

  useEffect(() => {
    // Get paket wisata by ID
    getPaketWisataById(params.id, setData);
  }, [params]);

  const fieldsInclude = ["no", "include"];
  const fieldsExclude = ["no", "exclude"];
  const fieldsDeskripsi = ["no", "hari_ke", "keterangan"];

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h2>Detail Paket Wisata</h2>
          <CButton type="button" color="warning" onClick={goBackToParent}>
            Kembali
          </CButton>
        </CCardHeader>
        <CCardBody>
          {data ? (
            <CRow>
              <CCol md="6">
                <h5>Agent Travel</h5>
                <p>{data.nama_agent_travel}</p>
                <hr />

                <h5>Nama Paket Wisata</h5>
                <p>{data.nama_paket_wisata}</p>
                <hr />

                <h5>Harga</h5>
                <p>
                  {parseInt(data.harga).toLocaleString("id", {
                    style: "currency",
                    currency: "IDR",
                  })}{" "}
                  / {data.satuan}
                </p>
                <hr />

                <h5>Meeting Point</h5>
                <p>{data.meeting_point}</p>
                <hr />

                {/* Include */}
                <h5>Include</h5>
                <CDataTable
                  items={data ? data.include : []}
                  fields={fieldsInclude}
                  pagination
                  striped
                  itemsPerPage={10}
                />

                {/* Exclude */}
                <h5>Exclude</h5>
                <CDataTable
                  items={data ? data.exclude : []}
                  fields={fieldsExclude}
                  pagination
                  striped
                  itemsPerPage={10}
                />

                {/* Deskripsi */}
                <h5>Deskripsi</h5>
                <CDataTable
                  items={data ? data.deskripsi : []}
                  fields={fieldsDeskripsi}
                  pagination
                  striped
                  itemsPerPage={10}
                  scopedSlots={{
                    hari_ke: (item) => <td width="80px">{item.hari_ke}</td>,
                  }}
                />
              </CCol>
              <CCol>
                <CCard>
                  <CCardHeader className="bg-dark text-center">
                    <h5>Gambar Paket Wisata</h5>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      {data &&
                        data.gambar_paket_wisata.map((item, index) => (
                          <CCol md="4" className="mb-2 p-1">
                            <img
                              key={index}
                              src={getImage(item.file_gambar)}
                              alt="gambar-paket-wisata"
                              className="img-thumbnail"
                            />
                          </CCol>
                        ))}
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="button" color="primary" onClick={goToGambar}>
                      Ubah
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            <div className="text-center mt-3">Loading...</div>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default DetailPaketWisata;
