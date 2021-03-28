import axiosInstance from "src/helpers/axios";
import { getInclude } from "./getInclude";

export const deleteInclude = (id_paket_wisata, id_include, setData) => {
  axiosInstance
    .delete(`paket-wisata/${id_paket_wisata}/include/${id_include}`)
    .then((res) => {
      console.log(res.data);
      getInclude(id_paket_wisata, setData);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
