import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from './pages/Signup';
import MainPage from './pages/MainPage.tsx';
import EmailLogin from "./pages/EmailLogin.tsx";


function App() {
  // const [count, setCount] = useState(0)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/email-login" element={<EmailLogin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App
