import React, { useContext, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { GlobalContext } from "src/context/Provider";
import { cekUser } from "src/context/actions/Auth";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TheLayout = () => {
  const { userState, userDispatch } = useContext(GlobalContext);
  const { data } = userState;

  useEffect(() => {
    // Cek token
    if (!sessionStorage.token) {
      MySwal.fire({
        icon: "error",
        title: "Akses Diblok",
        text: "Anda harus login terlebih dahulu",
      }).then((result) => {
        window.location.href = "/ngetrip/login";
      });
    }
  }, []);

  useEffect(() => {
    // Cek User
    cekUser(userDispatch);
  }, [userDispatch]);

  return (
    <>
      {sessionStorage.token && (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      )}
    </>
  );
};

export default TheLayout;
