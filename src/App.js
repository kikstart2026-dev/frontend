import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Shared/Header/Header';
import Footer from './Shared/Footer/Footer';
import Home from './Pages/Home/Home';
import FaqsPage from './Pages/Faqs-Page/FaqsPage';
import AboutUs from './Pages/About-Us-Page/AboutUs';
import WhyUs from './Pages/WhyUs-Page/WhyUs';
import InterestedSchoolsPage from './Pages/InterestedSchoolsPage/InterestedSchoolsPage';
import Programs from './Pages/Programs-Page/Programs';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/Interested-Schools" element={<InterestedSchoolsPage />} />
          <Route path="/programs" element={<Programs/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
