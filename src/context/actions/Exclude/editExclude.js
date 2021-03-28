import axiosInstance from "src/helpers/axios";

export const editExclude = (
  id_paket_wisata,
  id_exclude,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .put(`paket-wisata/${id_paket_wisata}/exclude/${id_exclude}`, values)
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
