import * as React from 'react';
import {useState} from 'react';

const NewForm = props =>{
   
    const [newFormName, updateTaskName] = useState('');
    const handleChangeInput = e =>{
        updateTaskName(e.target.value);
    }
    const handleSubmitForm = e =>{
        e.preventDefault();

        props.addNewForm(newFormName);

        updateTaskName('');
    }
    return(
        <form onSubmit={handleSubmitForm} style={{width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <input className="lists-item-newform-input" style={{width: '70%', marginRight: '10px'}} onChange={handleChangeInput} type="text" name="form" value={newFormName} placeholder="Название опроса" maxLength
="70"  required/>
            <button type="submit" style={{margin: '0 0 0 10px'}}>Создать опрос</button>
        </form>
    )
}

export default NewForm;