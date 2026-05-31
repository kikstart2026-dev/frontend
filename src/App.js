import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

import Header from "./Shared/Header/Header";
import Footer from "./Shared/Footer/Footer";

import SignUp from "./Pages/Authentication/SignUp/SignUp";
import SignIn from "./Pages/Authentication/SignIn/SignIn";
import ForgetPass from "./Pages/Authentication/ForgetPass/ForgetPass";
import ResetPass from "./Pages/Authentication/ResetPass/ResetPass";
import OtpVerified from "./Pages/Authentication/OtpVerified/OtpVerified";

import Home from "./Pages/Home/Home";
import FaqsPage from "./Pages/Faqs-Page/FaqsPage";
import AboutUs from "./Pages/About-Us-Page/AboutUs";
import WhyUs from "./Pages/WhyUs-Page/WhyUs";
import ContactUs from "./Pages/Contact-Us/ContactUs";
import InterestedSchoolsPage from "./Pages/InterestedSchoolsPage/InterestedSchoolsPage";
import Programs from "./Pages/Programs-Page/Programs";
import EnrolmentPackage from "./Pages/EnrolmentPackage/EnrolmentPackage";
import ProgramDeatailsPage from "./Pages/ProgramDeatailsPage/ProgramDeatailsPage";
import ContactForm from "./Component/ContactForm/ContactForm";


//DASHBOARD
import DashboardLayout from "./Layouts/DashboardLayout";
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";
import ChildrenProfile from "./Pages/Dashboard/ChildrenProfile/ChildrenProfile";
import ChildrenEdit from "./Pages/Dashboard/ChildrenProfileEdit/ChildrenProfileEdit";

import ChildrenDetails from "./Pages/FormDetails/ChildrenDetails/ChildrenDetails";
import SchoolDetails from "./Pages/FormDetails/SchoolDetails/SchoolDetails";
import FormParas from "./Component/ChildrenAll/FormPara/FormParas";
import WaiverAcceptance from "./Pages/FormDetails/WaiverAcceptance/WaiverAcceptance";
import ProgramDetailss from "./Pages/FormDetails/ProgramDetailss/ProgramDetailss";
import Messages from "./Component/Conversation/Messages";
import Transaction from "./Component/myTransaction/Transaction";

// ================= PROTECTED ROUTE =================
function ProtectedRoute({ children }) {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ================= AUTH ROUTE =================
// Logged in user যেন signup/signin এ যেতে না পারে
function AuthRoute({ children }) {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ================= OTP ROUTE =================
// Only accessible if verifyEmail exists
function OtpRoute({ children }) {
  const email = localStorage.getItem("verifyEmail");

  if (!email) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

// ================= LAYOUT =================
function Layout() {
  const location = useLocation();

  const authRoutes = [
    "/signup",
    "/signin",
    "/forget-pass",
    "/reset-pass",
    "/Otp",
  ];

  const isAuthPage = authRoutes.includes(location.pathname);

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isAuthPage && !isDashboardRoute && <Header />}

      <Routes>
        {/* ================= AUTH ROUTES ================= */}
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />

        <Route
          path="/forget-pass"
          element={
            <AuthRoute>
              <ForgetPass />
            </AuthRoute>
          }
        />

        <Route
          path="/reset-pass"
          element={
            <AuthRoute>
              <ResetPass />
            </AuthRoute>
          }
        />

        <Route
          path="/Otp"
          element={
            <OtpRoute>
              <OtpVerified />
            </OtpRoute>
          }
        />

        {/* ================= MAIN ROUTES ================= */}
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/Interested-Schools" element={<InterestedSchoolsPage />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/ProgramDeatailsPage" element={<ProgramDeatailsPage />} />
        <Route path="/contactform" element={<ContactForm />} />




        {/* ================= DASHBOARD ROUTES ================= */}

        {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<UserDashboard />} />
          <Route path="children-profile" element={<ChildrenProfile />} />
          <Route path="children-profile/:id" element={<ChildrenProfile />} />
          <Route path="children-edit/:id" element={<ChildrenEdit />} />

          <Route path="Children-details" element={<ChildrenDetails />} />
          <Route path="Schooldetails" element={<SchoolDetails />} />
          <Route path="WaiverAcceptance" element={<WaiverAcceptance />} />
          <Route path="ProgramDetailss" element={<ProgramDetailss />} />
          <Route path="enrolment-package" element={<EnrolmentPackage />} />
          <Route path="messages" element={<Messages />} />
          <Route path="transactions" element={<Transaction />} />

        </Route>
      </Routes>

      {!isAuthPage && !isDashboardRoute && <Footer />}
    </>
  );
}

// ================= APP =================
function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Router>
          <ToastContainer
            position="top-center"
            toastClassName="center-toast"
            bodyClassName="center-toast-body"
            closeOnClick={false}
            draggable={false}
          />
          <Layout />
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
