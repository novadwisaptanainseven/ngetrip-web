import axiosInstance from "src/helpers/axios";
import { LOADING, SUCCESS, ERROR } from "src/context/actionTypes";

export const getPaketWisataByAgentTravelMain = (id, dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`agent-travel/${id}/paket-wisata`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    });
};
