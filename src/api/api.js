import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:7000`,
});
const token = "Test-Token";
// intercept before send a request
api.interceptors.request.use(
  (config) => {
    config.headers["authToken"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// intercept before use a Response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if(err.response){
        err.message = `Status: ${err.response.status} Message: ${err.response.statusText}`;
    }
    // else send the genuine err message which will be 'Network Error'
    return Promise.reject(err);
  }
);

export default api;
