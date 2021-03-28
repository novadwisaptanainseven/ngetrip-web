import axiosInstance from "src/helpers/axios";
import { getExclude } from "./getExclude";

export const deleteExclude = (id_paket_wisata, id_exclude, setData) => {
  axiosInstance
    .delete(`paket-wisata/${id_paket_wisata}/exclude/${id_exclude}`)
    .then((res) => {
      console.log(res.data);
      getExclude(id_paket_wisata, setData);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
