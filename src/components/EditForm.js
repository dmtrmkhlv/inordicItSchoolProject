import * as React from 'react';
import {useState} from 'react';

const EditForm = props => {

    const [formData, changeInputValue] = useState({
        id: props.formId,
        name: props.formName,
        description: props.formDescription,
        questions: props.formQuestions
    });

     const handleChange = e => {
        changeInputValue({...formData, [e.target.name]: e.target.value});    
    }

    const handleChangeQuestionName = (e, index) => {
        let newQuestionName = [...formData.questions, formData.questions[index] =  [e.target.value] ];
        changeInputValue({...formData, [e.target.name]: newQuestionName})
    }

    const handleDeleteQuestionName = (e,index) => {
        e.preventDefault();
        let deleteQuestionName = formData.questions.splice(index, 1);
        changeInputValue({...formData, [formData.questions]: deleteQuestionName});
    }

    const handleAddQuestionName = (e) => {
        e.preventDefault();
        let addQuestionName = formData.questions.push(['']);
        changeInputValue({...formData, [formData.questions]: addQuestionName});
    }
    
    const handleSubmitForm = e => {
        e.preventDefault();
        props.changeForm(formData.id, {...formData});
    }

    const formEditStyle = {
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
    
    return (
        <form onSubmit={handleSubmitForm} style={formEditStyle.formStyle}>
            <div>
                <label style={formEditStyle.label} htmlFor='name'>
                    <span style={formEditStyle.labelSpan}>Название опроса</span>
                    <input style={formEditStyle.input} onChange={handleChange} type="text" name="name" value={formData.name} placeholder="Название опроса" maxLength
="70" required/>
                </label>
            </div>
            <div>
                <label style={formEditStyle.label} htmlFor='description'>
                    <span style={formEditStyle.labelSpan}>Описание опроса</span>
                    <textarea style={formEditStyle.textarea} onChange={handleChange} name="description" placeholder="Описание опроса" value={formData.description}></textarea>
                </label> 
            </div>
            {formData.questions.map((question, index) => {
                return (
                    <>
                    <div>
                        <label style={formEditStyle.label} htmlFor={`question-${(index+1)}`}>
                            <span style={formEditStyle.labelSpan}>{`Вопрос №${(index+1)}`}</span>
                            <input style={formEditStyle.input} onChange={e =>  handleChangeQuestionName(e, index)} type="text" name={`question-${(index+1)}`} placeholder="Напишите вопрос" value={formData.questions[index]} required />
                            <button className="button-delete" style={formEditStyle.buttonClose} onClick={e => handleDeleteQuestionName(e, index)}>X</button>
                        </label>
                    </div>
                    </>
                )
            })}
            <div><button onClick={e => handleAddQuestionName(e)} >Добавить вопрос</button></div>
            <div><button className="button-save" type="submit">Сохранить</button></div>
        </form>
    )
}

export default EditForm;