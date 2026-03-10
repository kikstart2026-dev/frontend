export const endpoints = {
  //Signup,login,otp-verify,reset-pass,etc------------------>>

  signUp: "/signup",
  login: "/login",
  verifyOtp: "/verify-otp",
  resendOtp: "/resendotp",
  forgotPass: "/forgot-password",
  reetPass: "/reset-password",
  logout: "/logout",
  googleAuth: "/google",


  // Enquiry---------------------->>

  createEnq: "/createEnq",

  // Contact---------------------->>

  contactUs: "/contact",

  // Home Banner------------------------------------>>
  getAllHomeBanner: "user/home-banner",
  getHomeBannerById: (id) => `user/home-banner/${id}`,


  // createHomeBanner: "/home-banner/create",
  // updateHomeBanner: (id) => `/home-banner/${id}`,
  // singleDeleteHomeBanner: (id) => `/home-banner/${id}`,
  // selectiveDeleteHomeBanner: "/home-banner/select/delete",
  // multipleDeleteHomeBanner: "/home-banner/delete/all",

  // Why Choose Us------------------------------------>>

  getAllWhyChooseUs: "user/why-choose-us",
  getWhyChooseUsById: (id) => `user/why-choose-us/${id}`,

  // service------------------------------------>>

  createService: "/service/create",
  getAllService: "/service/",
  getServiceById: (id) => `/service/${id}`,
  updateService: (id) => `/service/${id}`,
  singleDeleteService: (id) => `/service/${id}`,
  selectiveDeleteService: "/service/select/delete",
  multipleDeleteService: "/service/delete/all",

  // About Us------------------------------------>>

  createAboutUs: "/about-us/create",
  getAllAboutUs: "/about-us",
  getAboutUsById: (id) => `/about-us/${id}`,
  updateAboutUs: (id) => `/about-us/${id}`,
  singleDeleteAboutUs: (id) => `/about-us/${id}`,
  selectiveDeleteAboutUs: "/about-us/select/delete",
  multipleDeleteAboutUs: "/about-us/delete/all",

  // Testimonials------------------------------------>>

  getAllTest: "/user/testimonal",
  getTestById: (id) => `user/testimonal/${id}`,

  // FAQ --------------------------------------->>

  // createFaq: "/faq/admin/create",
  // getAllFaqsAdmin: "/faq/admin",
  getAllFaqsUser: "user/faq",
  // getFaqByIdAdmin: (id) => `/faq/admin/${id}`,
  getFaqByIdUser: (id) => `user/faq/${id}`,
  // updateFaq: (id) => `/faq/admin/${id}`,
  // deleteFaq: (id) => `/faq/admin/${id}`,
};


