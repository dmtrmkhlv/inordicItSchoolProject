const newForm = newFormData =>{
    return{
        type: 'NEW_FORM',
        form: {...newFormData}
    }
}
const editForm = (id, formData) =>{
    return{
        type: 'EDIT_FORM',
        id: id,
        name: formData.name,
        description: formData.description,
        questions: formData.questions
    }
}
const deleteForm = id => {
    return{
        type: 'DELETE_FORM',
        id: id
    }
}

export {newForm, editForm, deleteForm};