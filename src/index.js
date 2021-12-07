import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import configurationStore from './store';
import {Provider} from 'react-redux';

const store = configurationStore();
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
document.getElementById('root'));