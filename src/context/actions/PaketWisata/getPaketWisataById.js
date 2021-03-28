import axiosInstance from "src/helpers/axios";

export const getPaketWisataById = (id, setData) => {
  axiosInstance
    .get(`paket-wisata/${id}`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
