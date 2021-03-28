import axiosInstance from "src/helpers/axios";
import { getGambar } from "./getGambar";

export const deleteGambar = (id_paket_wisata, id_gambar, setData) => {
  axiosInstance
    .delete(`paket-wisata/${id_paket_wisata}/gambar/${id_gambar}`)
    .then((res) => {
      console.log(res.data);
      getGambar(id_paket_wisata, setData);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
