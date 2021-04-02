import { LOADING, SUCCESS, ERROR } from "src/context/actionTypes";
import axiosInstance from "src/helpers/axios";

export const getDashboardInformation = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`dashboard`)
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
