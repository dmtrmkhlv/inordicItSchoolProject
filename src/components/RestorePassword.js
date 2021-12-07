import React, { useState } from 'react';
import { withRouter } from "react-router";

const RestorePassword = (props) => {

    const   [login, setLogin] = useState(''),
            [code, setCode] = useState(''),
            [password, setPassword] = useState(''),
            [checkPassword, setCheckPassword] = useState('');

    const getCode = () => {
        if(login){
            fetch('http://localhost:5000/restore',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({login})
            }
            ).then(res => res.json()).then(res => {
                if(res && res.code){
                    setCode(res.code);
                }
            });
        }
    };

    const setNewPassword = () => {
        if(login && code && password && password === checkPassword ){
            fetch('http://localhost:5000/newpass',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login,
                    code,
                    password
                })
            }
            ).then( () => {
                props.history.replace('/');
            });
        }
    };

    return <div>
        <div>
            <label>
                <span>Логин</span>
                <input type={'text'} value={login} onChange={event => setLogin(event.target.value)}/>
            </label>
            <button onClick={getCode} disabled={!login} >Запросить код восстановления</button>
        </div>
        { code &&
        <div>
            <label>
                <span>Код восстановления</span>
                <input type={'text'} value={code} readOnly/>
            </label>
            <label>
                <span>Новый пароль</span>
                <input type={'password'} value={password} onChange={event => setPassword(event.target.value)}/>
            </label>
            <label>
                <span>Повторение пароля</span>
                <input type={'password'} value={checkPassword} onChange={event => setCheckPassword(event.target.value)}/>
            </label>
            <button disabled={!password || password !== checkPassword} onClick={setNewPassword}>Обновить пароль</button>
        </div>
}       
    </div>
};

export default withRouter(RestorePassword);