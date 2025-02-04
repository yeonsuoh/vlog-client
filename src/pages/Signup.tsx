import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {jwtDecode as jwt_decode} from 'jwt-decode';
import '../App.css';
import {API_URL} from "../config.ts";

// 폼 데이터 타입 정의
interface FormData {
    email: string;
    name: string;
    socialType: string;
    socialId: string;
    userId: string;
    profileName: string;
    intro: string;
    code: string;
}

// JWT 디코딩 결과 타입 정의
interface DecodedToken {
    email: string;
    name: string;
    socialType: string;
    socialId: string;
}


const Signup = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        socialType: '',
        socialId: '',
        userId: '',
        profileName: '',
        intro: '',
        code: '',
    });

    const [emailFromApi, setEmailFromApi] = useState<string | null>(null);

    // URL에서 쿼리 파라미터의 token을 추출하고 JWT 토큰에서 필요한 데이터 파싱
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const code = params.get('code');

        if (token) {
            try {
                // JWT 토큰 디코딩
                const decoded = jwt_decode<DecodedToken>(token);
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
            // code가 있는 경우, 이메일을 API에서 조회하여 상태에 저장
            fetch(`${API_URL}/v1/api/user/signup/verify-email?code=${code}`)
                .then((response) => response.json())
                .then((data) => {
                    setEmailFromApi(data.email);
                    setFormData((prev) => ({
                        ...prev,
                        code: code,
                    }));
                })
                .catch(error => {
                    console.error('이메일 조회 실패:', error);
                });
        }
    }, []);

    // 입력 값 변경 처리
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 폼 제출
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        const formDataWithEmail = {
            ...formData,
            email: emailFromApi || formData.email,
        };

        console.log(formDataWithEmail);

        fetch(`${API_URL}/v1/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataWithEmail),
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject('회원가입 실패');
                }
                return res.json();
            })
            .then((data) => {
                const token = data.token;

                if (token) {
                    localStorage.setItem('accessToken', token);
                    console.log("회원가입 성공, 토큰 저장")
                } else {
                    console.warn("회원가입 성공, 토큰 반환되지 않음")
                }

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
                    value={emailFromApi || formData.email} // API에서 받은 이메일 사용
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
