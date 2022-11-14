export default class {
  
  constructor(axios) {
    this.axiosClient = axios.create();
    this.axiosClient.defaults.baseURL = "https://freddy.codesubmit.io";
  }

  token = (token="") => {
    this.axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return this
  }

  get = async (url) => {
    return this.axiosClient.get(url);
  };

  post = async (url, data) => {
    return this.axiosClient.post(url, data);
  };

  configuration = () => ({
    baseURL: "https://freddy.codesubmit.io",
  });
}
