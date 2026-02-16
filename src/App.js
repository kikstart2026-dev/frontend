import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import Home from './Pages/Home/Home';

// import Button from './Component/Buttons/Button';


=======
import Header from './shared/Header/Header';
>>>>>>> origin/Ishitaaa
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
<<<<<<< HEAD
          {/* <Route path="/button" element={<Button />} /> */}
          <Route path="/accordion" element={<Home />} />
=======
>>>>>>> origin/Ishitaaa
        </Routes>
      </Router>
    </div>
  );
}

export default App;
