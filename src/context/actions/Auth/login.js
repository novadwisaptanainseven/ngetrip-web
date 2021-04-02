import { LOADING, SUCCESS, ERROR } from "src/context/actionTypes";
import axiosInstance from "src/helpers/axios";

const login = (values, dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .post("login", values)
    .then((res) => {
      sessionStorage.token = res.data.token;
      dispatch({
        type: SUCCESS,
        payload: res.data.user,
      });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.response.data.message,
      });
      console.log(err.response.data);
    });
};

export default login;
