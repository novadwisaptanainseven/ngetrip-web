import axiosInstance from "src/helpers/axios";
import cekUser from "./cekUser";

const updateUser = (
  idUser,
  values,
  dispatch,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .put(`update-user/${idUser}`, values)
    .then((res) => {
      console.log(res.data);
      cekUser(dispatch);
      setLoading(false);
      showAlertSuccess();
    })
    .catch((err) => {
      console.log(err.response.data);
      showAlertError(err.response.data.errors);
    });
};

export default updateUser;
