import { Axios } from "axios";

const axiosService = new Axios({
  baseURL: "http://localhost:1337/api/v1",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosService;
