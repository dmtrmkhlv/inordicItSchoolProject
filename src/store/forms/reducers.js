const initalState = [];

const formReducer = (state = initalState, action) => {
    switch(action.type){
        case 'NEW_FORM':
            if([...state].find((form)=> form.id === action.form.id)){
                return state;
            }
            return [...state, action.form];
        case 'EDIT_FORM': 
            const newForms = [...state];
            for( const form of newForms ){
                if( form.id === action.id ){
                    form.name = action.name;
                    form.description = action.description;
                    form.questions = action.questions;
                    break;  
                }
            }
            return newForms;    
        case 'DELETE_FORM':
            return state.filter(form => form.id !== action.id)
        default:
            return state;
    }
}
export {formReducer};