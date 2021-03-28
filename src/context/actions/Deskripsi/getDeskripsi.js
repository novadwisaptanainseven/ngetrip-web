import axiosInstance from "src/helpers/axios";

export const getDeskripsi = (id_paket_wisata, setData) => {
  axiosInstance
    .get(`paket-wisata/${id_paket_wisata}/deskripsi`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
