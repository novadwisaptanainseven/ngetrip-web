import axiosInstance from "src/helpers/axios";
import { getAllKontak } from "./getAllKontak";

export const deleteKontak = (
  id_kontak,
  id_agent,
  alertSuccess,
  alertError,
  setLoading,
  setData
) => {
  axiosInstance
    .delete(`agent-travel/${id_agent}/kontak/${id_kontak}`)
    .then((res) => {
      console.log(res.data);
      alertSuccess();
      getAllKontak(id_agent, setData, setLoading);
    })
    .catch((err) => {
      console.log(err.response.data);
      alertError();
    });
};
