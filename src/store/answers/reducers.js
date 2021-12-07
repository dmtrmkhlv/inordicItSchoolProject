const initalState = [];

const answersReducer = (state = initalState, action) => {
    switch(action.type){
        case 'NEW_ANSWERS':
            return [...state, action.answers];
        default:
            return state;
    }
}
export {answersReducer};