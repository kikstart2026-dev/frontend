export const endpoints = {
  //Signup,login,otp-verify,reset-pass,etc------------------>>

  signUp: "/signup",
  login: "/login",
  verifyOtp: "/verify-otp",
  resendOtp: "/resendotp",
  forgotPass: "/forgot-password",
  reetPass: "/reset-password",

  // Enquiry---------------------->>

  createEnq: "/createEnq",

  // Contact---------------------->>

  contactUs: "/contact",

  // Home Banner------------------------------------>>

  createHomeBanner: "/home-banner/create",
  getAllHomeBanner: "/home-banner",
  getHomeBannerById: (id) => `/home-banner/${id}`,
  updateHomeBanner: (id) => `/home-banner/${id}`,
  singleDeleteHomeBanner: (id) => `/home-banner/${id}`,
  selectiveDeleteHomeBanner: "/home-banner/select/delete",
  multipleDeleteHomeBanner: "/home-banner/delete/all",

  // service------------------------------------>>

  createService:"/service/create",
  getAllService:"/service/",
  getServiceById: (id) => `/service/${id}`,
  updateService: (id) => `/service/${id}`,
  singleDeleteService: (id) => `/service/${id}`,
  selectiveDeleteService:"/service/select/delete",
  multipleDeleteService :"/service/delete/all",
};
