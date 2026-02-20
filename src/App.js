import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Shared/Header/Header';
import Footer from './Shared/Footer/Footer';
import Home from './Pages/Home/Home';
import FaqsPage from './Pages/Faqs-Page/FaqsPage';
import InterestedSchoolsPage from './Pages/InterestedSchoolsPage/InterestedSchoolsPage';
import EnrolmentPackage from './Pages/EnrolmentPackage/EnrolmentPackage';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/Interested-Schools" element={<InterestedSchoolsPage />} />
            <Route path="/enrolment-package" element={<EnrolmentPackage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
