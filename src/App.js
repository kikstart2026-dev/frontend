import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

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
import ChildrenDetails from "./Pages/FormDetails/ChildrenDetails/ChildrenDetails";
import ChildrenDetailsForm from "./Component/ChildrenDetailsForm/ChildrenDetailsForm";
import SchoolDetailsForm from "./Component/SchoolDetailsForm/SchoolDetailsForm";
import SchoolDetails from "./Pages/FormDetails/SchoolDetails/SchoolDetails";


// ================= PROTECTED ROUTE =================
function ProtectedRoute({ children }) {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
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

  return (
    <>
      {!isAuthPage && <Header />}

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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/Interested-Schools" element={<InterestedSchoolsPage />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/enrolment-package" element={<EnrolmentPackage />} />
        <Route path="/ProgramDeatailsPage" element={<ProgramDeatailsPage />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/Childrendetails" element={<ChildrenDetails />} />
        <Route path="/Schooldetails" element={<SchoolDetails/>} />



        <Route path="/ChildrenDetailsForm" element={<ChildrenDetailsForm />} />
        <Route path="/SchoolDetailsForm" element={<SchoolDetails />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

// ================= APP =================
function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
