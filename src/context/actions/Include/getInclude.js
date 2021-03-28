import axiosInstance from "src/helpers/axios";

export const getInclude = (id_paket_wisata, setData) => {
  axiosInstance
    .get(`paket-wisata/${id_paket_wisata}/include`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
