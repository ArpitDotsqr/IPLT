export const isLogined = () => {
    let token = '';
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('isLoggedIn');
    }
    if (token) {
        return true;
    } else {
        return false;
    }
};


export const isUserLogined = () => {

    let token = '';
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    return token ? true : false;
}
