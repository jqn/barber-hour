import api from '../api';

function createServices(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_SERVICES', data: data });

    api.post('/barber/services', { barber: { services_attributes: data } }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'SERVICES_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_SERVICES', data: error.data }));
  }
}

function toggleService(name, value) {
  return {
    type: 'TOGGLE_SERVICE',
    data: {
      name,
      value
    }
  };
}

function changeServicePrice(name, price) {
  return {
    type: 'CHANGE_SERVICE_PRICE',
    data: {
      name,
      price
    }
  };
}

function addError() {
  return {
    type: 'ADD_SERVICES_ERROR'
  };
}

function getServices() {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_LOAD_SERVICES', data: {} });

    api.get('/barber/services', { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'SERVICES_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'SERVICES_LOAD_FAILED', data: error.data }));
  }
}

export {createServices, toggleService, changeServicePrice, addError, getServices};
