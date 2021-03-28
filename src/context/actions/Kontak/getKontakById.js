import axiosInstance from "src/helpers/axios";

export const getKontakById = (id_kontak, id_agent, setData) => {
  axiosInstance
    .get(`agent-travel/${id_agent}/kontak/${id_kontak}`)
    .then((res) => {
      console.log(res.data);
      setData(res.data.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
