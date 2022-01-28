import React, {useState} from 'react';
import styles from '../styles/Authorize';
import {withRouter} from "react-router";

const Authorize = (props) => {

  const [login, setLogin] = useState(''),
    [password, setPassword] = useState(''),
    [name, setName] = useState(''),
    [checkPassword, setCheckPassword] = useState(''),
    [step, setStep] = useState('login');

  const authorize = () => {
    fetch('http://localhost:5000/auth/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({login, password})
      })
      .then(res => res.json())
      .then(res => {
        props.login(login, res.name, res.token);
        setLogin('');
        setPassword('');
      });
  };

  const registration = () => {
    fetch('http://localhost:5000/registration/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({login, password, name})
      })
      .then(res => res.json())
      .then(res => {
        props.login(login, name, res.token);
        setLogin('');
        setPassword('');
      });
  };

  let styleLogin;
  let styleReg;
  if(step === 'login') {
    styleLogin = styles.buttonActive;
    styleReg = styles.buttonInactive;
}else{
    styleLogin = styles.buttonInactive;
    styleReg = styles.buttonActive;
}

  return <div style={styles.root}>
    <div style={styles.body}>
      <div style={styles.head}>
        <div style={styleLogin} onClick={() => setStep('login')}>Войти</div>
        <div style={styleReg} onClick={() => setStep('registration')}>Зарегистрироваться</div>
      </div>
      {step === 'login' && <div>
        <label style={styles.row}>
          <span style={styles.label}>Логин</span>
          <input
            style={styles.input}
            type={'text'}
            value={login}
            onChange={event => setLogin(event.target.value)}/>
        </label>
        <label style={styles.row}>
          <span style={styles.label}>Пароль</span>
          <input
            style={styles.input}
            type={'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}/>
        </label>
        <div style={styles.row}>
          <button
            disabled={!(login && password)}
            onClick={authorize}
            style={styles.button}>Войти</button>
        </div>
        <div style={styles.row}>
          <span
            style={styles.labelResetPassword}
            onClick={() => props.history.replace('./restore')}>Восстановить пароль</span>
        </div>

      </div>
}
      {step === 'registration' && <div>
        <label style={styles.row}>
          <span style={styles.labelReg}>Логин</span>
          <input
            style={styles.input}
            type={'text'}
            value={login}
            onChange={event => setLogin(event.target.value)}/>
        </label>
        <label style={styles.row}>
          <span style={styles.labelReg}>Имя</span>
          <input
            style={styles.input}
            type={'text'}
            value={name}
            onChange={event => setName(event.target.value)}/>
        </label>
        <label style={styles.row}>
          <span style={styles.labelReg}>Пароль</span>
          <input
            style={styles.input}
            type={'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}/>
        </label>
        <label style={styles.row}>
          <span style={styles.labelReg}>Повторите пароль</span>
          <input
            style={styles.input}
            type={'password'}
            value={checkPassword}
            onChange={event => setCheckPassword(event.target.value)}/>
        </label>
        <div style={styles.row}>
          <button
            disabled={!(login && name && password && password === checkPassword)}
            onClick={registration}
            style={styles.button}>
            Зарегистрироваться
          </button>
        </div>
      </div>
}
    </div>
  </div>;
};

export default withRouter(Authorize);