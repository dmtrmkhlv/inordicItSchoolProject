export const LOGIN = 'LOGIN';
export function login(login, name, token) {
    return {
        type: LOGIN,
        login,
        name,
        token
    };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
    return {
        type: LOGOUT
    };
}