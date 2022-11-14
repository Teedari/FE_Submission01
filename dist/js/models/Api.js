export default class {
  constructor(axios) {
    this.axiosClient = axios.create();
    this.axiosClient.defaults.baseURL = "https://freddy.codesubmit.io";
    this.axiosClient.interceptors.response.use(
      this.successInterceptor,
      this.errorHandleInterceptor
    );
  }

  token = (token = "") => {
    this.axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    return this;
  };

  get = async (url) => {
    return this.axiosClient.get(url);
  };

  post = async (url, data) => {
    return this.axiosClient.post(url, data);
  };

  successInterceptor = success => {
    return Promise.resolve(success)
  };
  errorHandleInterceptor = error => {
    if(error.response){
      alert(error.response.data?.msg)
    }
    return Promise.reject(error)
  };
}
