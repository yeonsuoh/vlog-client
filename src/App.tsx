import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from './pages/Signup';
import LoginModal from './pages/LoginModal.tsx';
import MainPage from './pages/MainPage.tsx';


function App() {
  // const [count, setCount] = useState(0)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                {/*<Route path="/login" element={<LoginModal />} />*/}
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App
