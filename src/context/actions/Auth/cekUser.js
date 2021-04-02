import axiosInstance from "src/helpers/axios";
import { LOADING, SUCCESS, ERROR } from "src/context/actionTypes";

const cekUser = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get("user")
    .then((res) => {
      console.log(res.data.user);
      dispatch({
        type: SUCCESS,
        payload: res.data.user,
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

export default cekUser;
