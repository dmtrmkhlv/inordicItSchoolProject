import {combineReducers, createStore} from 'redux';
import {formReducer} from './forms/reducers';
import {answersReducer} from './answers/reducers';
import main from "./main/reducers";

const rootReducer = combineReducers({
    answers: answersReducer,
    forms:formReducer, 
    main
});

const configurationStore = () => createStore(rootReducer);

export default configurationStore;