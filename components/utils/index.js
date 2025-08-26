import { jwtDecode } from "jwt-decode";


export const getRole = () => {
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    if (token) {
        const token = jwtDecode(localStorage.getItem('token'));
        return token.role;
    }
    return null;
};

export const setCookies = (expDays, LoginToken, RoleKey, RoleId) => {
    const date = new Date()
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + date.toUTCString()
    document.cookie = "role" + "=" + RoleKey + ";" + expires + ";path=/";
    document.cookie = "token" + "=" + LoginToken + ";" + expires + ";path=/"
    document.cookie = "isLoggedIn" + "=" + true + ";" + expires + ";path=/"
    document.cookie = 'LoggedInId' + '=' + RoleId + ';' + expires + ";path=/"
}

export const getToken = () => {
    let token = null
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
        return token
    }
    return token
}
