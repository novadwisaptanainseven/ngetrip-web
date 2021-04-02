import React, { useContext } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { logout } from "src/context/actions/Auth";
import { GlobalContext } from "src/context/Provider";

const MySwal = withReactContent(swal2);

const TheHeaderDropdown = () => {
  const { userState } = useContext(GlobalContext);
  const { data } = userState;

  const handleLogout = () => {
    MySwal.fire({
      icon: "warning",
      title: "Logout",
      text: "Anda yakin ingin logout ?",
      confirmButtonText: "YA",
      showCancelButton: "TIDAK",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Anda berhasil Logout", "", "success").then((res) => {
          logout();
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("level");
          window.location.href = "/ngetrip/login";
        });
      }
    });
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div>{data && data.name}</div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
