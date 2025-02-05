import useAuth from "../hooks/useAuth"
import {useState} from "react";
import LoginModal from "./LoginModal.tsx";
import "./MainPage.css"

const MainPage = () => {

    const token = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <h1>메인 페이지 입니다</h1>
            {token ? (
                <p>✅ 로그인 완료. 토큰: {token}</p>
            ) : (
                <p>❌ 로그인 X</p>
            )}

            {/* 로그인 상태에 따라 버튼 변경 */}
            {token ? (
                <button>내 정보</button>
            ) : (
                <button className="login-button" onClick={() => setIsModalOpen(true)}>로그인</button>
            )}

            {/* 모달이 열려 있으면 LoginModal 렌더링 */}
            {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)}/>}
        </div>
    );
};

export default MainPage;