import * as React from 'react';
import SubListForms from './SubListForms';

const ListTasksStyle = {
    listStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%'
    },
    sublistTaskStyle: {
        width: '100%',
        border: 'solid 1px #0000001a',
        padding: '10px'
    }
}

const ListForms = props => {
    return (
        <>
        <h2>Личный кабинет</h2>
        <div className="lists" style={ListTasksStyle.listStyle}>
            <SubListForms styleProperty={ListTasksStyle.sublistTaskStyle}
                name='Опросы'
                addNewForm={props.addNewForm}
                forms={props.forms}
                handleDeleteForm={props.handleDeleteForm}
                handleChangeForm={props.handleChangeForm}
                getAnswers={props.getAnswers}
                token={props.token}/>
        </div>
        </>
    )
}

export default ListForms;