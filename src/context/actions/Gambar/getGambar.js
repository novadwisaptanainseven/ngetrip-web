import axiosInstance from "src/helpers/axios";

export const getGambar = (id_paket_wisata, setData) => {
  axiosInstance
    .get(`paket-wisata/${id_paket_wisata}/gambar`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
