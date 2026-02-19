import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Header from './Shared/Header/Header';
import Footer from './Shared/Footer/Footer';
import SignUp from './Pages/Authentication/SignUp/SignUp';
import SignIn from './Pages/Authentication/SignIn/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
