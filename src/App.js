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
import InterestedSchoolsPage from './Pages/InterestedSchoolsPage/InterestedSchoolsPage';
import EnrolmentPackage from './Pages/EnrolmentPackage/EnrolmentPackage';
import ProgramDeatailsPage from './Pages/ProgramDeatailsPage/ProgramDeatailsPage';
import ContactForm from './Component/ContactForm/ContactForm';

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
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/Interested-Schools" element={<InterestedSchoolsPage />} />
        <Route path="/enrolment-package" element={<EnrolmentPackage />} />
        <Route path="/ProgramDeatailsPage" element={<ProgramDeatailsPage />} />
        <Route path="/contactform" element={<ContactForm />} />
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