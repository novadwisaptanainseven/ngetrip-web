import React, { useContext, useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CCardFooter,
  CButtonGroup,
  CButton,
  CFormGroup,
  CInput,
  CBadge,
  CCollapse,
  CRow,
  CCol,
} from "@coreui/react";
// import data from "./data";
import { useHistory } from "react-router-dom";
import { LoadAnimationBlue } from "src/assets";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format, getTime } from "date-fns";
import { GlobalContext } from "src/context/Provider";
import { getTransaksi } from "src/context/actions/Transaksi/getTransaksi";

const MySwal = withReactContent(swal2);

const Transaksi = () => {
  const history = useHistory();
  const [filterText, setFilterText] = useState("");
  const [collapse, setCollapse] = useState(false);
  const { transaksiState, transaksiDispatch } = useContext(GlobalContext);
  const { data, loading } = transaksiState;

  const toggle = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    // Get All Transaksi
    getTransaksi(transaksiDispatch);
  }, [transaksiDispatch]);

  const filteredData = data
    ? data.transaksi.filter(
        (item) =>
          item.paket_wisata &&
          item.pembeli &&
          (item.paket_wisata.toLowerCase().includes(filterText.toLowerCase()) ||
            item.pembeli.toLowerCase().includes(filterText.toLowerCase()))
      )
    : [];

  const fields = [
    "no",
    "kode_transaksi",
    "pembeli",
    "paket_wisata",
    "tgl_transaksi",
    "tgl_checkin",
    "qty",
    "total_harga",
    "status",
    // "aksi",
  ];

  const goToTambah = () => {
    history.push("/ngetrip/admin/agent-travel/tambah");
  };

  const goToEdit = (id) => {
    history.push(`/ngetrip/admin/agent-travel/edit/${id}`);
  };

  const goToDetail = (id) => {
    history.push(`/ngetrip/admin/agent-travel/detail/${id}`);
  };

  const goToKontak = (id) => {
    history.push(`/ngetrip/admin/agent-travel/${id}/kontak`);
  };

  // Menangani tombol hapus
  const handleDelete = (id) => {
    MySwal.fire({
      icon: "warning",
      title: "Anda yakin ingin menghapus data ini ?",
      text: "Jika yakin, klik YA",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA",
    }).then((res) => {
      if (res.isConfirmed) {
        // Memanggil method deletePNS untuk menghapus data PNS
        // deleteAgentTravel(id, agentTravelDispatch);
        MySwal.fire({
          icon: "success",
          title: "Terhapus",
          text: "Data berhasil dihapus",
        });
      }
    });
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h2>Agent Travel</h2>
        </CCardHeader>
        <CCardBody>
          <CCard>
            <CCardHeader>
              <b>Informasi Pendapatan Agent Travel</b>
            </CCardHeader>
            <CCollapse show={collapse}>
              <CCardBody>
                <table border="0" cellPadding="10">
                  <tr>
                    <td>
                      <b>Total Pendapatan Derawan Fun Trip</b>
                    </td>
                    <td>:</td>
                    <td>
                      {data &&
                        parseInt(
                          data.total_pendapatan_derawan_fun_trip
                        ).toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Pendapatan Trivefun</b>
                    </td>
                    <td>:</td>
                    <td>
                      {data &&
                        parseInt(data.total_pendapatan_trivefun).toLocaleString(
                          "id",
                          {
                            style: "currency",
                            currency: "IDR",
                          }
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Pendapatan HVTrip</b>
                    </td>
                    <td>:</td>
                    <td>
                      {data &&
                        parseInt(data.total_pendapatan_hvtrip).toLocaleString(
                          "id",
                          {
                            style: "currency",
                            currency: "IDR",
                          }
                        )}
                    </td>
                  </tr>
                </table>
              </CCardBody>
            </CCollapse>
            <CCardFooter>
              <CButton color="primary" onClick={toggle} className={"mb-1"}>
                Lihat
              </CButton>
            </CCardFooter>
          </CCard>
          <div className="controller mb-3 d-flex justify-content-between align-items-center">
            <div>
              <b>Total Transaksi: </b> {data && data.transaksi.length}
            </div>
            <CFormGroup className="m-0">
              <CInput
                type="text"
                id="pencarian"
                name="pencarian"
                onChange={(e) => setFilterText(e.target.value)}
                value={filterText}
                placeholder="Pencarian..."
              />
            </CFormGroup>
          </div>
          {!filteredData.length > 0 && (
            <div className="text-center mb-3">
              <img src={LoadAnimationBlue} alt="load-animation" width={30} />
            </div>
          )}
          {data && data.transaksi.length > 0 && (
            <CDataTable
              items={filteredData}
              fields={fields}
              striped
              itemsPerPage={10}
              pagination
              scopedSlots={{
                // aksi: (item) => (
                //   <td>
                //     <CButtonGroup>
                //       <CButton
                //         type="button"
                //         size="sm"
                //         color="danger"
                //         onClick={() => handleDelete(item.id_agent_travel)}
                //       >
                //         Hapus
                //       </CButton>
                //     </CButtonGroup>
                //   </td>
                // ),
                status: (item) => {
                  let currentTimestamp = new Date().getTime();

                  let tglTransaksiTimestamp = new Date(
                    item.tgl_transaksi
                  ).getTime();

                  let tglCheckinTimestamp = new Date(
                    item.tgl_checkin
                  ).getTime();

                  let status = null;

                  if (
                    currentTimestamp >= tglTransaksiTimestamp &&
                    currentTimestamp <= tglCheckinTimestamp
                  ) {
                    status = true;
                  } else {
                    status = false;
                  }

                  return (
                    <td>
                      {status === true && (
                        <CBadge className="mr-1" color="success">
                          Active
                        </CBadge>
                      )}
                      {status === false && (
                        <CBadge className="mr-1" color="danger">
                          Expired
                        </CBadge>
                      )}
                    </td>
                  );
                },
                tgl_transaksi: (item) => (
                  <td>{format(new Date(item.tgl_transaksi), "dd/MM/yyyy")}</td>
                ),
                tgl_checkin: (item) => (
                  <td>{format(new Date(item.tgl_checkin), "dd/MM/yyyy")}</td>
                ),
                total_harga: (item) => (
                  <td>
                    {item.total_harga.toLocaleString("id", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                ),
              }}
            />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Transaksi;
