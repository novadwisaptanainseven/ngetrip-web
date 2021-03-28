import axiosInstance from "src/helpers/axios";
import { getGambar } from "./getGambar";

export const editStatusGambar = (
  id_paket_wisata,
  id_gambar,
  setData,
  value
) => {
  axiosInstance
    .put(`paket-wisata/${id_paket_wisata}/gambar/${id_gambar}/status`, {
      status: value,
    })
    .then((res) => {
      console.log(res.data);
      getGambar(id_paket_wisata, setData);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
