import jwtDecode from 'jwt-decode';

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    }
};