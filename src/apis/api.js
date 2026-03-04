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

export const forgotPass = async (payload) => {
  const res = await axiosInstance.post(endpoints.forgotPass, payload);
  return res.data;
};

export const reetPass = async (payload) => {
  const res = await axiosInstance.post(endpoints.reetPass, payload);
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



/* ================================
    Home Banner APIs
================================ */

// ✅ Create Home Banner (FormData লাগবে)
export const createHomeBanner = async (payload) => {
  const res = await axiosInstance.post(endpoints.createHomeBanner, payload);
  return res.data;
};

// ✅ Get All Home Banner
export const getAllHomeBanner = async () => {
  const res = await axiosInstance.get(endpoints.getAllHomeBanner);
  return res.data;
};

// ✅ Get Home Banner By ID
export const getHomeBannerById = async (id) => {
  const res = await axiosInstance.get(
    endpoints.getHomeBannerById(id)
  );
  return res.data;
};

// ✅ Update Home Banner (FormData লাগবে)
export const updateHomeBanner = async (id, payload) => {
  const res = await axiosInstance.put(
    endpoints.updateHomeBanner(id),payload);
  return res.data;
};

// ✅ Delete Single
export const singleDeleteHomeBanner = async (id) => {
  const res = await axiosInstance.delete(
    endpoints.singleDeleteHomeBanner(id)
  );
  return res.data;
};

// ✅ Delete Selective
export const selectiveDeleteHomeBanner = async (payload) => {
  const res = await axiosInstance.delete(
    endpoints.selectiveDeleteHomeBanner,
    { data: payload }
  );
  return res.data;
};

// ✅ Delete All
export const multipleDeleteHomeBanner = async () => {
  const res = await axiosInstance.delete(
    endpoints.multipleDeleteHomeBanner
  );
  return res.data;
};