import axiosInstance from "src/helpers/axios";

export const getSelectAgentTravel = (setData) => {
  axiosInstance
    .get("agent-travel")
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
