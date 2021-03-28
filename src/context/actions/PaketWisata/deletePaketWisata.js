import axiosInstance from "src/helpers/axios";
import { getPaketWisata } from "./getPaketWisata";

export const deletePaketWisata = (id, dispatch) => {
  axiosInstance
    .delete(`paket-wisata/${id}`)
    .then((res) => {
      console.log(res.data);
      getPaketWisata(dispatch);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
