import Axios from "axios";
import config from "./config";

export const getApi = async (action) => {
  try {
    const response = await Axios.get(`${config.serverURL}${action}`);
    return {
      data: response.data.data,
      isSuccess: response.data.status,
      status: response.status,
    };
  } catch (error) {
    return {
      data: error.response?.data?.message,
      isSuccess: error.response?.data?.status,
      status: error.response?.status,
    };
  }
};

export const postApi = async (action, data) => {
  try {
    const response = await Axios.post(`${config.serverURL}${action}`, data);
    return {
      data: response.data.data,
      isSuccess: response.data.status,
      status: response.status,
    };
  } catch (error) {
    return {
      data: error.response?.data?.message,
      isSuccess: error.response?.data?.status,
      status: error.response?.status,
    };
  }
};

export const putApi = async (action, data) => {
  try {
    const response = await Axios.put(`${config.serverURL}${action}`, data);
    return {
      data: response.data.data,
      isSuccess: response.data.status,
      status: response.status,
    };
  } catch (error) {
    return {
      data: error.response?.data?.message,
      isSuccess: error.response?.data?.status,
      status: error.response?.status,
    };
  }
};

export const postFormData = async (action, file) => {
  try {
    let formData = new FormData();
    formData.append("image", file);
    console.log(file);
    console.log(formData);
    const response = await Axios.post(
      `${config.serverURL}${action}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return {
      data: response.data.data,
      isSuccess: response.data.status,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return {
      data: error.response?.data?.message,
      isSuccess: error.response?.data?.status,
      status: error.response?.status,
    };
  }
};
