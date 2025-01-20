import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { onNaverLogin, getData } from './utils/utils';
import Signup from './pages/Signup';


function App() {
  // const [count, setCount] = useState(0)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

const Home = () => (
    <>
        <button onClick={onNaverLogin}>NAVER LOGIN</button>
        <button onClick={getData}>GET DATA</button>
    </>
);

export default App
