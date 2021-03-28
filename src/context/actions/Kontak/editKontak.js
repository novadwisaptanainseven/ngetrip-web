import axiosInstance from "src/helpers/axios";

export const editKontak = (
  id_agent,
  id_kontak,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .put(`agent-travel/${id_agent}/kontak/${id_kontak}`, values)
    .then((res) => {
      console.log(res.data);
      setLoading(false);
      showAlertSuccess();
    })
    .catch((err) => {
      console.log(err.response.data);
      showAlertError(err.response.data.errors);
    });
};
