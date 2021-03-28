import axiosInstance from "src/helpers/axios";

export const getPaketWisataByAgentTravel = (id, setData) => {
  axiosInstance
    .get(`agent-travel/${id}/paket-wisata`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
