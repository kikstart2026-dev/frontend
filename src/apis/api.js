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

// ✅ Create 
export const createHomeBanner = async (payload) => {
  const res = await axiosInstance.post(
    endpoints.createHomeBanner,
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
  return res.data;
};

// ✅ Get All
export const getAllHomeBanner = async () => {
  const res = await axiosInstance.get(endpoints.getAllHomeBanner);
  return res.data;
};

// ✅ Get By ID
export const getHomeBannerById = async (id) => {
  const res = await axiosInstance.get(
    endpoints.getHomeBannerById(id)
  );
  return res.data;
};

// ✅ Update 
export const updateHomeBanner = async (id, payload) => {
  const res = await axiosInstance.put(
    endpoints.updateHomeBanner(id),
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
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

/* ================================
    Why Choose Us APIs
================================ */

// ✅ Create
export const createWhyChooseUs = async (payload) => {
  const res = await axiosInstance.post(
    endpoints.createWhyChooseUs,
    payload
  );
  return res.data;
};

// ✅ Get All 
export const getAllWhyChooseUs = async () => {
  const res = await axiosInstance.get(endpoints.getAllWhyChooseUs);
  return res.data;
};

// ✅ Get By ID
export const getWhyChooseUsById = async (id) => {
  const res = await axiosInstance.get(
    endpoints.getHomeBannerById(id)
  );
  return res.data;
};

// ✅ Update
export const updateWhyChooseUs = async (id, payload) => {
  const res = await axiosInstance.put(
    endpoints.updateWhyChooseUs(id),
    payload
  );
  return res.data;
};

// ✅ Selective Delete 
export const selectiveDeleteWhyChooseUs = async (payload) => {
  const res = await axiosInstance.delete(
    endpoints.selectiveDeleteWhyChooseUs,
    { data: payload }
  );
  return res.data;
};

// ✅ Single Delete
export const singleDeleteWhyChooseUs = async (id) => {
  const res = await axiosInstance.delete(
    endpoints.singleDeleteWhyChooseUs(id)
  );
  return res.data;
};

// ✅ Delete All
export const multipleDeleteWhyChooseUs = async () => {
  const res = await axiosInstance.delete(
    endpoints.multipleDeleteWhyChooseUs
  );
  return res.data;
};


/* ================================
    About Us APIs
================================ */

// Create
export const createAboutUs = async (payload) => {
  const res = await axiosInstance.post(
    endpoints.createAboutUs,
    payload
  );
  return res.data;
};

// Get All
export const getAllAboutUs = async () => {
  const res = await axiosInstance.get(
    endpoints.getAllAboutUs
  );
  return res.data;
};

// Get By ID
export const getAboutUsById = async (id) => {
  const res = await axiosInstance.get(
    endpoints.getAboutUsById(id)
  );
  return res.data;
};

// Update
export const updateAboutUs = async (id, payload) => {
  const res = await axiosInstance.put(
    endpoints.updateAboutUs(id),
    payload
  );
  return res.data;
};

// Selective Delete
export const selectiveDeleteAboutUs = async (payload) => {
  const res = await axiosInstance.delete(
    endpoints.selectiveDeleteAboutUs,
    { data: payload }
  );
  return res.data;
};

// Single Delete
export const singleDeleteAboutUs = async (id) => {
  const res = await axiosInstance.delete(
    endpoints.singleDeleteAboutUs(id)
  );
  return res.data;
};

// Delete All
export const multipleDeleteAboutUs = async () => {
  const res = await axiosInstance.delete(
    endpoints.multipleDeleteAboutUs
  );
  return res.data;
};