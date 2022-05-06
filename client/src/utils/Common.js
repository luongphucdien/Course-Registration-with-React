export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr)
        return JSON.parse(userStr);
    else
        return null;
}


export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}


export const removeSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}


export const setSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}