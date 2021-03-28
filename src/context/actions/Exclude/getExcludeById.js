import axiosInstance from "src/helpers/axios";

export const getExcludeById = (id_paket_wisata, id_exclude, setData) => {
  axiosInstance
    .get(`paket-wisata/${id_paket_wisata}/exclude/${id_exclude}`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
