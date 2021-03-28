import axiosInstance from "src/helpers/axios";

export const getAllKontak = (id_agent, setData, setLoading) => {
  setLoading(true);

  axiosInstance
    .get(`agent-travel/${id_agent}/kontak`)
    .then((res) => {
      console.log(res.data);
      setData(res.data.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err.response.data);
      setLoading(false);
    });
};
