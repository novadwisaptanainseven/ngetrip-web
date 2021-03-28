import axiosInstance from "src/helpers/axios";
import { getAllAgentTravel } from "./getAllAgentTravel";

export const deleteAgentTravel = (id, dispatch) => {
  axiosInstance
    .delete(`agent-travel/${id}`)
    .then((res) => {
      console.log(res.data);
      getAllAgentTravel(dispatch);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
