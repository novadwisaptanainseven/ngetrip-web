import axiosInstance from "src/helpers/axios";

export const getDeskripsiById = (id_paket_wisata, id_deskripsi, setData) => {
  axiosInstance
    .get(`paket-wisata/${id_paket_wisata}/deskripsi/${id_deskripsi}`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
