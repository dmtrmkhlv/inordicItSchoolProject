import * as React from 'react';
import {useState} from 'react';

const FormQuestions = props => {

const [formData, changeInputValue] = useState({});

const [isFetch, changeIsFetch] = useState(false);

const [formAnswer, changeFormAnswer] = useState({});

const [allAnswers, changeAllAnswers] = useState({});

const handleSubmitForm = e =>{
    e.preventDefault();
    props.addNewAnswer(formAnswer);
}

const handleChange = e => {
    changeFormAnswer({...formAnswer, [e.target.name]: e.target.value});
}

const handleChangeAnswer = e => {
    changeAllAnswers({...allAnswers, [e.target.name]: e.target.value});
    changeFormAnswer({...formAnswer, allAnswers});
}
    const formEditStyle = {
        formBox: {
            background: 'rgba(0,0,0,0.01)', 
            border: 'solid 1px #0000001a', 
            boxShadow: '2px 2px 3px -1px rgba(0,0,0,0.5)', 
            margin: '5px', 
            display: 'flex', 
            alignItems: 'start', 
            justifyContent: 'space-between', 
            padding: '20px 10px 30px 10px'
        },
        formStyle: {
            width: '65%'
        },
        label: {
            position: 'relative',
            display: 'block',
            width: '100%',
            margin: '10px 0'
        },
        labelSpan: {

        },
        input: {
            width: '100%'
        },
        textarea: {
            width: '100%',
            resize: 'vertical',
            rows: '10',
            minHeight: '70px'
        },
        buttonClose: {
            position: 'absolute',
            right: '-50px',
            top: '8px'
        }
    }

    !isFetch? 
    fetch(`http://localhost:5000/api/user/form/${window.location.pathname.split('/')[2]}`, {
        method: 'get',
        headers: {
            'Token': props.token
        }
    }).then(res => res.json()).then(res => {
        changeInputValue({...formData, ...res});
        changeIsFetch(true);
        changeFormAnswer({...formAnswer, name: formData.name, formId: formData._id}); 
        return formData;
    }) : null;

    return (
        <>    
            <div className="questions-box" style={formEditStyle.formBox}>
                <div className={`lists-item`} style={{width: '100%', padding: '20px'}}>
                    <div className="lists-item-header" style={{}}>
                        <h2 style={{textAlign: 'center'}}>{formData.name??"Загрузка опроса..."}</h2>
                        <div style={{margin: '40px 0'}}>
                            <span>{formData.description??"Если опрос не появился обновите страницу"}</span>
                        </div>                               
                    </div>
                    {isFetch ? (<form onSubmit={handleSubmitForm} className="lists-item-box" style= {{width: '100%'}}>
                        {formData.questions.map((question, index) => {
                            return (
                                <>
                                    <label style={formEditStyle.label} htmlFor={`answer-${(index+1)}`}>
                                        <span style={formEditStyle.labelSpan} >{question}</span>
                                        <input onChange={handleChangeAnswer} style={formEditStyle.input}  type="text" name={`answer-${(index+1)}`} placeholder="Напишите ответ" />
                                    </label>
                                </>
                                )}) 
                        }         
                        <label style={formEditStyle.label} htmlFor={'answerId'}>
                            <span style={formEditStyle.labelSpan} >Ваш id</span>
                            <input onChange={handleChange} style={formEditStyle.input, {width: '30%', margin: '10px'}}  type="text" name={'answerId'} placeholder="Напишите свой id для отправки формы" required/>
                            <button type="submit">Отправить ответы</button>
                        </label>     
                        <input onChange={handleChange} style={{display: 'none'}}  type="text" name={'formId'} value={formData.id}/>
                        <input onChange={handleChange} style={{display: 'none'}}  type="text" name={formData.name} value={formData.name}/>          
                    </form>) : null}
                </div>
            </div>
        </>
    )
}

export default FormQuestions;