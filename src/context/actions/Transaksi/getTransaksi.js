import { LOADING, SUCCESS, ERROR } from "src/context/actionTypes";
import axiosInstance from "src/helpers/axios";

export const getTransaksi = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`tiket-wisata`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SUCCESS,
        payload: res.data.data,
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
