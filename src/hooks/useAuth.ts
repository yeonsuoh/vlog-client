import {useEffect, useState} from "react";

const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
            console.log("✅ 로그인 성공, 토큰 저장: ", storedToken);
        } else {
            console.log("❌ 로그인되지 않음.");
        }
    }, []);

    return token; //
};

export default useAuth;