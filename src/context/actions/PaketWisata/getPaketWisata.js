import axiosInstance from "src/helpers/axios";
import { LOADING, SUCCESS, ERROR } from "src/context/actionTypes";

export const getPaketWisata = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`paket-wisata`)
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
