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

  // Heading---------------------->>
  getAllHeadings: "/headings",

  // Home Banner------------------------------------>>
  getAllHomeBanner: "user/home-banner",
  getHomeBannerById: (id) => `user/home-banner/${id}`,

  // Why Choose Us------------------------------------>>

  getAllWhyChooseUs: "user/why-choose-us",
  getWhyChooseUsById: (id) => `user/why-choose-us/${id}`,

  // service------------------------------------>>

  getAllService: "user/service/",
  getServiceById: (id) => `user/service/${id}`,

  // About Us------------------------------------>>

  getAllAboutUs: "user/about-us",
  getAboutUsById: (id) => `user/about-us/${id}`,


  // Testimonials------------------------------------>>

  getAllTest: "/user/testimonal",
  getTestById: (id) => `user/testimonal/${id}`,

  // FAQ --------------------------------------->>

  getAllFaqsUser: "user/faq",
  getFaqByIdUser: (id) => `user/faq/${id}`,


  // Interested Schools --------------------------------------->>

  getAllSchools: "user/schools/",
  getSchoolById: (id) => `user/schools/${id}`,

  // Payment Gateway --------------------------------------->>
  payment: "/kikPayment",
  getAllPayments: "/all-payments",

  // SUBSCRIPTION --------------------------------------->>

  getAllPlans: "/subscription/all",

  getSinglePlan: (id) => `/subscription/single/${id}`,

  saveSubscription: "/subscription-payment/save-subscription",

  getUserActivePlan: (email) => `/subscription-payment/active-plan/${email}`,

  // CHILDREN PROFILE ------------------------------------->>

  createChild: "/children/createChild",

  getAllChild: "/children/getAllChild",

  getChildById: "/children/getChildById",

  updateChild: "/children/updateChild",

  deleteChild: "/children/deleteChild",

  deleteAllChild: "/children/deleteAllChild",


  // Schools (PUBLIC / USER SIDE)-------------------------------->>

  createSchoolDetails: "school/createSchoolDetails",
  getAllSchoolDetails: "school/getAllSchoolDetails",
  getSchoolDetailsById: (id) => `school/getSchoolDetailsById/${id}`,
  updateSchoolDetails: (id) => `school/updateSchoolDetails/${id}`,
  deleteSchoolDetails: (id) => `school/deleteSchoolDetails/${id}`,
  deleteAllSchoolDetails: "school/deleteAllSchoolDetails",




  // Conversation
  createConversation: "conversation/create",
  addParticipant: "conversation/participant",
  getUserConversations: (userId) => `conversation/my-chats/${userId}`,
  deleteConversation: (conversationSid) => `conversation/${conversationSid}`,
  generateToken: "conversation/token",

  // Message
  sendMessage: "message/send",
  getMessages: (conversationSid) => `message/${conversationSid}`,

  //chat user only
  getChatUsers: "admin/users/chat-users",



};




