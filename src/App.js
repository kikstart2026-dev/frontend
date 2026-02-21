import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Header from './Shared/Header/Header';
import Footer from './Shared/Footer/Footer';

import SignUp from './Pages/Authentication/SignUp/SignUp';
import SignIn from './Pages/Authentication/SignIn/SignIn';
import ForgetPass from './Pages/Authentication/ForgetPass/ForgetPass';
import ResetPass from './Pages/Authentication/ResetPass/ResetPass';

import Home from './Pages/Home/Home';
import FaqsPage from './Pages/Faqs-Page/FaqsPage';
import AboutUs from './Pages/About-Us-Page/AboutUs';
import WhyUs from './Pages/WhyUs-Page/WhyUs';
import ContactUs from './Pages/Contact-Us/ContactUs';
import ChildrenDetails from '../src/Pages/Form&Details/ChildrenDetails/ChildrenDetails';
import InterestedSchoolsPage from './Pages/InterestedSchoolsPage/InterestedSchoolsPage';
import EnrolmentPackage from './Pages/EnrolmentPackage/EnrolmentPackage';


function Layout() {
  const location = useLocation();

  const authRoutes = ["/signup", "/signin", "/forget-pass", "/reset-pass"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget-pass" element={<ForgetPass />} />
        <Route path="/reset-pass" element={<ResetPass />} />

        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
         <Route path="/contact" element={<ContactUs/>} />
         <Route path="/ChildrenDetails" element={<ChildrenDetails/>} />
          <Route path="/why-us" element={<WhyUs />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/Interested-Schools" element={<InterestedSchoolsPage />} />
        <Route path="/enrolment-package" element={<EnrolmentPackage />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}


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