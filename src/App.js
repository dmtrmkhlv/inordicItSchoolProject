import * as React from 'react';
import {useState, useEffect} from 'react';
import ListForms from './components/ListForms';
import {connect} from 'react-redux';
import {newForm, editForm, deleteForm} from './store/forms/actions';
import newAnswers from './store/answers/actions';
import {login} from "./store/main/actions";
import './styles/App.scss';
import Authorize from "./components/Authorize";
import RestorePassword from './components/RestorePassword';
import {Link, Redirect} from 'react-router-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";

import FormQuestions from './components/FormQuestions';
import FormAnswers from './components/FormAnswers';

const App = props => {

  let date = "";

  const [users,
    setUsers] = useState('');

  let [isSend,
    changeIsSend] = useState(false);

  let [isAnswers,
    changeIsAnswers] = useState(false);

  const [answersArr,
    changeAnswersArr] = useState({});

  useEffect(() => {
    if (!props.isLogin && props.token) {
      fetch('http://localhost:5000/check', {
          headers: {
            'Token': props.token
          }
        })
        .then(res => res.json())
        .then(({res}) => {
          if (res) {
            props.login('', '', props.token);

            fetch('http://localhost:5000/api/users', {
                headers: {
                  "Token": props.token
                }
              })
              .then(res => res.json())
              .then(res => {
                setUsers(res.users);
                fetch('http://localhost:5000/api/user/form', {
                    headers: {
                      'Token': props.token
                    }
                  })
                  .then(res => res.json())
                  .then(res => {
                    res
                      .forms
                      .map(form => {
                        props.newForm({id: form._id, name: form.name, description: form.description, status: form.status, questions: form.questions});
                      });
                    date = res.date;
                    const timeout = setTimeout(fresh, 10000);
                  });
              });
          }
        });
    }
  }, []);

  const fresh = () => {
    if (date) {
      fetch('http://localhost:5000/api/user/user/fresh', {
        method: 'post',
        headers: {
          'Token': props.token,
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({date})
        })
        .then(res => res.json())
        .then(res => {
          res
            .forms
            .map(form => {
              props.newForm({id: form._id, name: form.name, description: form.description, questions: form.questions});
            });
          date = res.date;
          return setTimeout(fresh, 3000);
        })

    } else {
      return setTimeout(fresh, 10000);
    }
  };

  const handleChangeForm = (id, formData) => {
    updateForms(id, formData).then(() => {
      props.editForm(id, formData);
    });
  }

  const handleDeleteForm = id => {
    fetch(`http://localhost:5000/api/user/form/${id}`, {
      method: 'delete',
      headers: {
        'Token': props.token
      }
    }).then(() => {
      props.deleteForm(id);
    });
  }

  const addNewForm = formName => {
    const newFormData = {
      name: formName,
      description: null,
      questions: []
    }
    fetch(`http://localhost:5000/api/user/form`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Token': props.token
      },
        body: JSON.stringify({form: newFormData})
      })
      .then(res => res.json())
      .then(res => {
        newFormData.id = res._id;
        props.newForm(newFormData);
      });
  }

  const updateForms = (id, newData) => {
    const form = {
      ...props
        .forms
        .find(item => item.id === id),
      ...newData
    };
    return fetch(`http://localhost:5000/api/user/form/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Token': props.token
      },
      body: JSON.stringify({form})
    });
  };

  const addNewAnswer = answerData => {
    fetch(`http://localhost:5000/api/user/answer`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Token': props.token
      },
        body: JSON.stringify({answer: answerData})
      })
      .then(res => res.json())
      .then(res => {
        changeIsSend(isSend = true);
      });
  }

  const getAnswers = id => {
    let answersArr = {};
    fetch(`http://localhost:5000/api/user/answer/${id}`, {
        method: 'get',
        headers: {
          'Token': props.token
        }
      })
      .then(res => res.json())
      .then(res => {
        res
          .answers
          .map(answer => {
            props.newAnswers(answer);
          });
        changeIsAnswers(isAnswers = true);
      })
  }

  const appStyle = {
    wrapper: {
      margin: "0px auto",
      maxWidth: "80%"
    },
    info: {
      background: 'rgba(0, 0, 0, 0.01)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: 'rgba(0, 0, 0, 0.5) 2px 2px 3px -1px',
      margin: '5px',
      padding: '100px',
      textAlign: 'center'
    },
    infoSpan:{
        marginRight: '15px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    homeButton: {
      textDecoration: 'none',
      color: '#000000'
    }
  }

  return ( 
<React.StrictMode> 
  <div className="wrapper" style={appStyle.wrapper}>
    <header style={appStyle.header}>
      <h1>Опросы online</h1>
      {isAnswers
        ? <button>
            <a href="/user" style={appStyle.homeButton}>Личный кабинет</a>
          </button>
        : null}
    </header>
    <Router>
      <Route exact path={'/'}>
        {!props.isLogin
          ? <Authorize login={props.login}/>
          : <Redirect to={'/user'}/>}
      </Route>
      <Route exact path={'/restore'}>
        {!props.isLogin
          ? <RestorePassword/>
          : <Redirect to={'/user'}/>}
      </Route>
      <Route path={'/user'}>
        <>
          { isAnswers ? <Redirect to={'/answers'
      } /> : null}
          <ListForms
          addNewForm={addNewForm}
          forms={props.forms}
          handleDeleteForm={handleDeleteForm}
          handleChangeForm={handleChangeForm}
          getAnswers={getAnswers}
          answers={props.answers}
          token={props.token}/>
      </>
    </Route>
    <Route path={'/form/:id'}>
      <>{!isSend
        ? <FormQuestions props={props}
        token={props.token}
        addNewAnswer={addNewAnswer}/>
      :
      <div style={appStyle.info}>
        <span>Ответы отправлены!</span>
      </div>}
    </>
  </Route>
  <Route path={'/answers'}>
    <>
      { isAnswers ? <FormAnswers answers={props.answers
  } /> : <div style={appStyle.info}>
    <span style={appStyle.infoSpan}>Для просмотра ответов перейдите в
    </span>
    <button>
      <a href="/user" style={appStyle.homeButton}>Личный кабинет</a>
    </button>
  </div>}
      </>
  </Route>
</Router>
</div> 
</React.StrictMode>
    )
}

const mapStateToProps = state => ({
    forms: state.forms,
    isLogin: state.main.isLogin,
    token: state.main.token,
    answers: state.answers
});
export default connect(mapStateToProps, {
    newAnswers,
    newForm,
    editForm,
    deleteForm,
    login
})(App);