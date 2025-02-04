// src/utils/utils.ts


import {API_URL} from "../config.ts";

export const onNaverLogin = (): void => {
    window.location.href = `${API_URL}/oauth2/authorization/naver`;
};

export const getData = (): void => {


    fetch(`${API_URL}/main`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data);
        })
        .catch((error) => alert(error));
};
