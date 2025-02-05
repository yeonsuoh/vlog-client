import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const EmailLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            fetch(`http://localhost:8080/email-login?code=${code}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.accessToken) {
                        localStorage.setItem("accessToken", data.accessToken);
                        console.log("이메일 로그인 성공, 토큰 저장");
                        navigate("/");
                    } else {
                        alert("이메일 로그인 실패");
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("로그인 요청 중 문제 발생");
                    navigate("/");
                });
        } else {
            alert("잘못된 로그인 링크입니다.");
            navigate("/");
        }
    }, [navigate]);

    return <p>로그인 중입니다...</p>
};

export default EmailLogin;
