import * as React from 'react';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';

const ActionTypes = {
    STARTED_UPDATING: 'STARTED_UPDATING',
    UPDATED: 'UPDATED'
};

class AsyncApi {
    static getFieldValue() {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.floor(Math.random() * 100));
            }, 1000);
        });
        return promise;
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <input value={this.props.field}/>
                <button disabled={this.props.isWaiting} onClick={this.props.update}>Fetch</button>
                {this.props.isWaiting && <div>Waiting...</div>}
            </div>
        );
    }
}


App.propTypes = {
    dispatch: React.PropTypes.func,
    field: React.PropTypes.any,
    isWaiting: React.PropTypes.bool
};

const reducer = (state = { field: 'No data', isWaiting: false }, action) => {
    switch (action.type) {
        case ActionTypes.STARTED_UPDATING:
            return { ...state, isWaiting: true };
        case ActionTypes.UPDATED:
            return { ...state, isWaiting: false, field: action.payload };
        default:
            return state;
    }
};
const store = Redux.createStore(reducer);
const ConnectedApp = connect(
    (state) => {
        return { ...state };
    },
    (dispatch) => {
        return {
            update: () => {
                dispatch({
                    type: ActionTypes.STARTED_UPDATING
                });
                AsyncApi.getFieldValue()
                    .then(result => dispatch({
                        type: ActionTypes.UPDATED,
                        payload: result
                    }));
            }
        };
    })(App);
export default class extends React.Component {
    render() {
        return <Provider store={store}><ConnectedApp/></Provider>;
    }
}
