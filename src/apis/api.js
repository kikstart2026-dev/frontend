import { axiosInstance } from "../Helper/Helper";
import { endpoints } from "./endpoints/endpoints";

export const signUp = async (payload) => {
  const res = await axiosInstance.post(endpoints.signUp, payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await axiosInstance.post(endpoints.login, payload);
  return res.data;
};

export const verifyOtp = async (payload) => {
  const res = await axiosInstance.post(endpoints.verifyOtp, payload);
  return res.data;
};

export const resendOtp = async (payload) => {
  const res = await axiosInstance.post(endpoints.resendOtp, payload);
  return res.data;
};



export const contactUs = async (payload) => {
  const res = await axiosInstance.post(endpoints.contactUs, payload);
  return res.data;
};

export const createEnq = async (payload) => {
  const res = await axiosInstance.post(endpoints.createEnq, payload);
  return res.data;
};