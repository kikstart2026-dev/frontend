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

  getAllAboutUs: "/user/about-us",
  getAboutUsById: (id) => `user/about-us/${id}`,


  // Testimonials------------------------------------>>

  getAllTest: "/user/testimonal",
  getTestById: (id) => `user/testimonal/${id}`,

  // FAQ --------------------------------------->>

  getAllFaqsUser: "user/faq",
  getFaqByIdUser: (id) => `user/faq/${id}`,
};


