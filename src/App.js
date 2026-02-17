import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Shared/Header/Header'; // Ishita-r Header
import Footer from './Shared/Footer/Footer'; // Apnar Footer
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
