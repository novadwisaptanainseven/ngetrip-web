import axiosInstance from "src/helpers/axios";

export const editInclude = (
  id_paket_wisata,
  id_include,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .put(`paket-wisata/${id_paket_wisata}/include/${id_include}`, values)
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
