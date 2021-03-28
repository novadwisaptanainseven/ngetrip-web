import axiosInstance from "src/helpers/axios";

export const getAgentTravelById = (id, setData) => {
  axiosInstance
    .get(`agent-travel/${id}`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
