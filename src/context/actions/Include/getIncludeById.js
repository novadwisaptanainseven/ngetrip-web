import axiosInstance from "src/helpers/axios";

export const getIncludeById = (id_paket_wisata, id_include, setData) => {
  axiosInstance
    .get(`paket-wisata/${id_paket_wisata}/include/${id_include}`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
