import React from "react";
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
import { CChartBar } from "@coreui/react-chartjs";

const Dashboard = () => {
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
                header="3"
                text="Agent Travel"
                color="gradient-info"
                inverse
              >
                <CIcon content={cilLibraryBuilding} height="36" />
              </CWidgetProgressIcon>
            </CCol>
            <CCol sm="2" md="4">
              <CWidgetProgressIcon
                header="9"
                text="Paket Wisata"
                color="gradient-success"
                inverse
              >
                <CIcon content={cilBriefcase} height="36" />
              </CWidgetProgressIcon>
            </CCol>
            <CCol sm="2" md="4">
              <CWidgetProgressIcon
                header="20"
                text="Transaksi"
                color="gradient-warning"
                inverse
              >
                <CIcon content={cilMoney} height="36" />
              </CWidgetProgressIcon>
            </CCol>
          </CRow>
          <CRow>
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
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
