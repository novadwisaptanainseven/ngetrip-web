import axiosInstance from "src/helpers/axios";

export const editDeskripsi = (
  id_paket_wisata,
  id_deskripsi,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .put(`paket-wisata/${id_paket_wisata}/deskripsi/${id_deskripsi}`, values)
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
