import axiosInstance from "src/helpers/axios";

const logout = () => {
  axiosInstance
    .post("logout")
    .then((res) => {})
    .catch((err) => console.log(err.response.message));
};

export default logout;
