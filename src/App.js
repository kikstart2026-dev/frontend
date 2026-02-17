import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './shared/Footer/Footer'; 
import Home from './Pages/Home/Home';
import Header from './shared/Header/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/> 
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
