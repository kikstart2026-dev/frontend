import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Shared/Header/Header';
import Footer from './Shared/Footer/Footer';
import Home from './Pages/Home/Home';
import FaqsPage from './Pages/Faqs-Page/FaqsPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FaqsPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
