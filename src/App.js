import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage';
import Navbar from "./components/Navbar/Navbar"
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Private from './components/Navbar/Private/Private';
import Anon from "./components/Navbar/Anon/Anon"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup"
          element={<Anon>
            <SignupPage />
          </Anon>} />
        <Route path="/login"
          element={<Anon>
            <LoginPage />
          </Anon>} />
        <Route path="/main"
          element={<Private>
            <MainPage />
          </Private>} />
      </Routes>
    </div>
  );
}

export default App;
