import React from "react";
import CIcon from "@coreui/icons-react";
import { cilLibraryBuilding, cilBriefcase } from "@coreui/icons";

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
    name: "Pengaturan",
    to: "/ngetrip/admin/pengaturan",
    icon: "cil-settings",
  },
];

export default _nav;
