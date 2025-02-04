import {useState} from 'react';
import {getData, onNaverLogin} from "../utils/utils.ts";
import {API_URL} from "../config.ts";


const LoginModal = ({onClose}: { onClose: () => void}) => {
    const [email, setEmail] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSignupOrLogin = (action: 'login' | 'signup') => {
        // 이메일 파라미터로 POST 요청 보내기
        fetch(`${API_URL}/v1/api/email/verification?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({action}),
        })
            .then((response) => response.json())
            .then(() => {
                alert(`${action === 'signup' ? '회원가입' : '로그인'} 요청이 성공적으로 처리되었습니다.`);
                onClose(); // 로그인 요청 후 모달 닫기
            })
            .catch((error) => {
                console.error(error);
                alert('요청 처리 중 문제가 발생했습니다.');
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>로그인</h2>
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="이메일 입력" />
                <button onClick={() => handleSignupOrLogin("login")}>이메일로 로그인/회원가입</button>
                <p>소셜 계정으로 로그인</p>
                <button onClick={onNaverLogin}>NAVER</button>
                <br />
                <button onClick={getData}>테스트</button>
                <br />
                <button onClick={onClose}>닫기</button> {/*닫기 버튼 추가 */}
            </div>
        </div>
    );
};
export default LoginModal;
