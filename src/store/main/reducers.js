import { LOGIN, LOGOUT } from "./actions";

const initState = {
    isLogin: false,
    login: '',
    name: '',
    token: localStorage.getItem('token') || ''
};

const mainReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('token', action.token);
            return {
                isLogin: true,
                login: action.login,
                name: action.name,
                token: action.token
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                isLogin: false,
                login: '',
                name: '',
                token: ''
            };
        default:
            return state;
    }
};

export default mainReducer;