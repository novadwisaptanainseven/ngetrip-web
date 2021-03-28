import axiosInstance from "src/helpers/axios";
import { getDeskripsi } from "./getDeskripsi";

export const deleteDeskripsi = (id_paket_wisata, id_deskripsi, setData) => {
  axiosInstance
    .delete(`paket-wisata/${id_paket_wisata}/deskripsi/${id_deskripsi}`)
    .then((res) => {
      console.log(res.data);
      getDeskripsi(id_paket_wisata, setData);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
