// src/utils/utils.ts

export const onNaverLogin = (): void => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
};

export const getData = (): void => {
    fetch("http://localhost:8080/test", {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data);
        })
        .catch((error) => alert(error));
};
