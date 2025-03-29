// lib/axiosInstance.js
import axios from "axios";

const authClientInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  timeout: 1000,
});

const refreshToken = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-tokens`,
      null,
      {
        withCredentials: true,
      }
    );
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
  function (response) {
    console.log("ulit doi?");
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },

  async function (error) {
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
