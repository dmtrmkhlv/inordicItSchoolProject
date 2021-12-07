import * as React from 'react';
import SubListFormsItem from  './SubListFormsItem';
import NewForm from './NewForm';

const SubListForms = props=>{

    return(
        <div className={`lists-item`} style={props.styleProperty}>
            <div className="lists-item-header"
             style={{margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 10px'}}>
                <h2>{props.name} ({props.forms.length})</h2>
                <NewForm addNewForm={props.addNewForm}/>
            </div>
            <div className="lists-item-box" style= {{width: '100%'}}
            >
                {
                    props.forms.map(form => <SubListFormsItem 
                        key={form.id} {...form} 
                        handleDeleteForm={props.handleDeleteForm } 
                        handleChangeForm={props.handleChangeForm} 
                        getAnswers={props.getAnswers}
                        token={props.token}/>)
                }
            </div>
        </div>
    )
}

export default SubListForms;