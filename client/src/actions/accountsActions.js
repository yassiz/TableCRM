/*
Actions, and action creators, are used for changing application state.
An action creator is a function that returns an object (an action)
the action has a 'type' that describes the type of action that was just triggered
that action is then automatically sent to all reducers within the application

below, the function getAccounts is an action creator.


*/

import axios from 'axios';

import { getNewAndUpdatedRows, getRemovedIds } from '../lib/helper';

export function getAccounts(e) {
  return function(dispatch) {
    axios
      .get('/api/accounts')
      .then(response => {
        console.log(response);
        dispatch({
          type: 'GET_ALL_ACCOUNTS',
          payload: response.data
        });
      })
      .catch(err => {
        console.error.bind(err);
      });
  };
}

export function createAndUpdateAccounts(changes, source) {
  return function(dispatch) {
    let postCallback = function(newRows) {
      axios.post('/api/accounts', { newRows }).then(() => {
        dispatch(getAccounts);
      });
    };

    let putCallback = function(updatedRows) {
      axios.put('/api/accounts', { updatedRows }).then(() => {
        dispatch(getAccounts);
      });
    };

    let getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    getNewAndUpdatedRowsBound(changes, source, postCallback, putCallback);
  };
}
