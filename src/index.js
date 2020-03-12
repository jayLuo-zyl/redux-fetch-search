import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Create a initialState
const initialState = {
    text: '',
    bills: [],
    showVetoIssues: false
};

// Create a reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_TEXT':
            const typingText = action.data.toUpperCase();
            console.log("typingText in action.data: ", typingText);
            return {
                ...state,
                text: typingText
            };

        case 'API_FETCH':
            console.log('API_FETCH in action.data: ', action.data);
            return {
                ...state,
                bills: action.data
            };

        case 'DISPLAY_VETOS':
            return {
                ...state,
                showVetoIssues: !state.showVetoIssues
            };

        // case 'SHOW_TEXT':
        //     console.log('SHOW_TEXT in action.data:', action.data);
        //     break;

        default:
            return state;
    }
}

// Create a store passing in reducer
const store = createStore(reducer);

// Wrap the App in a Provider passing in store
render(
    <Provider store={store}>
        <App randomProps='whatever' />
    </Provider>,
    document.getElementById('root')
);

