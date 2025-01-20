import {useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import '../App.css';


const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        socialType: '',
        socialId: '',
        userId: '',
        profileName: '',
        intro: '',
        code: '',
    });

    // URL에서 쿼리 파라미터의 token을 추출하고 JWT 토큰에서 필요한 데이터 파싱
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const code = params.get('code');

        if (token) {
            try {
                // JWT 토큰 디코딩
                const decoded = jwt_decode(token);
                setFormData({
                    email: decoded.email,
                    name: decoded.name,
                    socialType: decoded.socialType,
                    socialId: decoded.socialId,
                    userId: '',
                    profileName: '',
                    intro: '',
                    code: '',
                });
            } catch (error) {
                console.log(error);
                alert('토큰 파싱 실패');
            }
        } else if (code) {
            // code가 있는 경우에 대한 처리
            setFormData({
                email: '',
                name: '',
                socialType: '',
                socialId: '',
                userId: '',
                profileName: '',
                intro: '',
                code: code,
            });
        }
    }, []);

    // 입력 값 변경 처리
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/v1/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert('회원가입 성공');
                window.location.href = '/'; // 메인 페이지로 리다이렉트
            })
            .catch((err) => {
                console.error(err);
                alert('회원가입 실패');
            });
    };

    return (
        <div className="container">
            <h1>환영합니다!</h1>
            <p>기본 회원 정보를 등록해 주세요.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="profileName">프로필 이름</label>
                <input
                    type="text"
                    id="profileName"
                    name="profileName"
                    placeholder="프로필 이름을 입력하세요."
                    value={formData.profileName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                />

                <label htmlFor="userId">사용자 ID</label>
                <input
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="사용자 ID를 입력하세요."
                    value={formData.userId}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="intro">한 줄 소개</label>
                <input
                    type="text"
                    id="intro"
                    name="intro"
                    placeholder="당신을 한 줄로 소개해 보세요."
                    value={formData.intro}
                    onChange={handleChange}
                />

                <div className="actions">
                    <button type="submit" className="btn-submit">가입</button>
                    <button type="button" className="btn-cancel" onClick={() => (window.location.href = '/')}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
