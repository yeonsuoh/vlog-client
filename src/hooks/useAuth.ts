import {useEffect, useState} from "react";

const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // `document.cookie`에서 Authorization 쿠키 찾기
        const foundToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("Authorization="))
            ?.split("=")[1];

        if (foundToken) {
            localStorage.setItem("accessToken", foundToken);
            setToken(foundToken);
            console.log("✅ 로그인 성공, 토큰 저장: ", foundToken);
        } else {
            console.log("❌ 로그인되지 않음.");
        }
    }, []);

    return token; //
};

export default useAuth;