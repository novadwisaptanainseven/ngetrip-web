import React, { useContext, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetProgressIcon,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { cilLibraryBuilding, cilBriefcase, cilMoney } from "@coreui/icons";
import { GlobalContext } from "src/context/Provider";
import { getDashboardInformation } from "src/context/actions/Dashboard/getDashboardInformation";
// import { CChartBar } from "@coreui/react-chartjs";

const Dashboard = () => {
  const { dashboardState, dashboardDispatch } = useContext(GlobalContext);
  const { data } = dashboardState;

  useEffect(() => {
    // Get dashboard information
    getDashboardInformation(dashboardDispatch);
  }, [dashboardDispatch]);

  return (
    <>
      <CCard>
        <CCardHeader>
          <h2 className="text-center">
            Selamat Datang di Halaman Administrator NgetripYuk
          </h2>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="2" md="4">
              <CWidgetProgressIcon
                header={data ? data.total_agent_travel : "Loading..."}
                text="Agent Travel"
                color="gradient-info"
                inverse
              >
                <CIcon content={cilLibraryBuilding} height="36" />
              </CWidgetProgressIcon>
            </CCol>
            <CCol sm="2" md="4">
              <CWidgetProgressIcon
                header={data ? data.total_paket_wisata : "Loading..."}
                text="Paket Wisata"
                color="gradient-success"
                inverse
              >
                <CIcon content={cilBriefcase} height="36" />
              </CWidgetProgressIcon>
            </CCol>
            <CCol sm="2" md="4">
              <CWidgetProgressIcon
                header={data ? data.total_transaksi : "Loading..."}
                text="Transaksi"
                color="gradient-warning"
                inverse
              >
                <CIcon content={cilMoney} height="36" />
              </CWidgetProgressIcon>
            </CCol>
          </CRow>
          {/* <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  Statistik Transaksi Berdasarkan Bulan
                </CCardHeader>
                <CCardBody>
                  <CChartBar
                    datasets={[
                      {
                        label: "Jumlah Transaksi",
                        backgroundColor: "#f87979",
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                      },
                    ]}
                    labels="months"
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow> */}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
