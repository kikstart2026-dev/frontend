import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './shared/Header/Header';
import Home from './Pages/Home/Home';
import ProgramsSection from './Pages/Home/ProgramsSection';
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes >
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
