import axios from 'axios';

import { getNewAndUpdatedRows, getRemovedIds, getHiddenCols, colPropsToIndices } from '../lib/helper';

export function getAllOpportunities() {
  let request = axios.get('/api/opportunities');
  return {
    type: 'GET_ALL_OPPORTUNITIES',
    payload: request
  };
}

export function createAndUpdateOpportunities(changes, source) {
  return function(dispatch) {
    let postCallback = function(newRows) {
      axios.post('/api/opportunities', {newRows})
        .then(() => { dispatch(getAllOpportunities()); });
    };

    let putCallback = function(updatedRows) {
      axios.put('/api/opportunities', {updatedRows})
        .then(() => { dispatch(getAllOpportunities()); });
    };

    let getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    getNewAndUpdatedRowsBound(changes, source, postCallback, putCallback);
  };
}

export function deleteOpportunities(index, amount) {
  return function(dispatch) {
    const getRemovedIdsBound = getRemovedIds.bind(this);
    const removedIds = getRemovedIdsBound();
    axios({
      method: 'DELETE',
      url: '/api/opportunities',
      data: {removedIds}
    });
  };
}

export function getHiddenColumnsOfOpportunities(dispatch) {
  let colPropsToIndicesBound = colPropsToIndices.bind(this);

  axios.get('/api/opportunities/columns')
  .then(response => {
    let hiddenColIndices = colPropsToIndicesBound(response.data);
    dispatch({
      type: 'GET_HIDDENCOLUMNS_OF_OPPORTUNITIES',
      payload: hiddenColIndices
    });
  });
}

export function updateHiddenColumnsOfOpportunities(context) {
  return function(dispatch) {
    let getHiddenColsBound = getHiddenCols.bind(this);
    let hiddenColumns = getHiddenColsBound(context);
    axios.put('/api/opportunities/columns', {hiddenColumns});
  };
}
