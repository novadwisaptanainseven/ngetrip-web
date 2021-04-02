import React from "react";
import CIcon from "@coreui/icons-react";
import { cilLibraryBuilding, cilBriefcase, cilMoney } from "@coreui/icons";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/ngetrip/admin/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Agent Travel",
    to: "/ngetrip/admin/agent-travel",
    icon: (
      <CIcon content={cilLibraryBuilding} customClasses="c-sidebar-nav-icon" />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Paket Wisata",
    to: "/ngetrip/admin/paket-wisata",
    icon: <CIcon content={cilBriefcase} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Transaksi",
    to: "/ngetrip/admin/transaksi",
    icon: <CIcon content={cilMoney} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Pengaturan Akun",
    to: "/ngetrip/admin/pengaturan-akun",
    icon: "cil-settings",
  },
];

export default _nav;
