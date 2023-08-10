import axios from "axios";
import { BackendBaseURI } from "./ApiContants";

const tokenKey = "ROCP_token";

export const setAuthToken = (token) => {
  localStorage.setItem(tokenKey, token);
}

export const clearAuthToken = (token) => {
  localStorage.clear(tokenKey);
};

const getToken = () => localStorage.getItem(tokenKey).replaceAll("\"","");

const getConfig = () => {
  return {
    baseUrl: BackendBaseURI,
    headers: { Authorization: "Bearer " + getToken() },
    method: "GET",
  };
};

export const getAPI = async (url) => {
  try {
    const config = getConfig();
    const result = await axios({
      ...config,
      url: `${BackendBaseURI}/${url}`,
    });
    return { status: result.status, data: await result.data };
  } catch (error) {
    console.log(error);
  }
};

export const getAPIByParameter = async (url, data) => {
  try {
    const config = getConfig();
    const result = await axios({
      ...config,
      url: `${BackendBaseURI}/${url}${data}`,
    });
    return { status: result.status, data: await result.data };
  } catch (error) {
    console.log(error);
  }
};

const postConfig = () => {
  return {
    baseUrl: BackendBaseURI,
    headers: {
      Authorization: "Bearer " + getToken(),
      "content-type": "application/json",
    },
    method: "POST",
  };
};

export const postAPI = async (url, data) => {
  try {
    const config = postConfig()
    console.log("postapi config", config, data);
    const result = await axios({
      config,
      url: `${BackendBaseURI}/${url}`,
      data,
    });
    return { status: result.status, data: await result.data };
  } catch (error) {
    console.log(error);
  }
};
