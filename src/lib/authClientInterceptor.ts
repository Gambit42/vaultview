// lib/axiosInstance.js
import axios from "axios";

const authClientInterceptor = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // Replace with your API base URL
  timeout: 1000,
});

const refreshToken = async () => {
  try {
    await axios.post(`/api/auth/refresh-tokens`);
  } catch (error) {
    console.log("cannot refresh", error);
  }
};

// Add a request interceptor
authClientInterceptor.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor

authClientInterceptor.interceptors.response.use(
  async function (response) {
    console.log("ulit doi?");
    const originalRequest = response.config;

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.data.status === 401) {
      try {
        await refreshToken(); // Refresh the tokenawait refreshToken(); // Wait for the refresh token process to complete
        return axios(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
    // console.log("ROAM", response);
    return response;
  },

  async function (error) {
    console.log("ERROR RESPONSE ITO", error.response);
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      try {
        await refreshToken(); // Refresh the tokenawait refreshToken(); // Wait for the refresh token process to complete

        console.log("refreshed doi");
        return axios(originalRequest);
      } catch (refreshError) {
        console.log("hindi refreshed doi");
        // Handle any errors that occur during token refresh
        return Promise.reject(refreshError); // Reject the promise if token refresh fails
      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default authClientInterceptor;
