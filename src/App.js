import './Main.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';

// import Button from './Component/Buttons/Button';


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          {/* <Route path="/button" element={<Button />} /> */}
          <Route path="/accordion" element={<Home />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
