import api from '../api';

function createScheduleTemplates(data, isUpdating) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_SCHEDULE_TEMPLATES', data: data });

    api.post('/barber/schedule_templates', { barber: data, is_updating: isUpdating }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'SCHEDULE_TEMPLATES_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_SCHEDULE_TEMPLATES', data: error.data }));
  }
}

function toggleScheduleTemplate(weekday, value) {
  return {
    type: 'TOGGLE_SCHEDULE_TEMPLATE',
    data: {
      weekday,
      value
    }
  };
}

function changeScheduleTemplateTime(weekday, field, time) {
  return {
    type: 'CHANGE_SCHEDULE_TEMPLATE_TIME',
    data: {
      weekday,
      field,
      time
    }
  };
}

function changeAverageServiceTime(averageServiceTime) {
  return {
    type: 'CHANGE_AVERAGE_SERVICE_TIME',
    data: {
      averageServiceTime
    }
  };
}

function addError() {
  return {
    type: 'ADD_SCHEDULE_TEMPLATES_ERROR'
  };
}

function getScheduleTemplates() {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_LOAD_SCHEDULE_TEMPLATES', data: {} });

    api.get('/barber/schedule_templates', { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'SCHEDULE_TEMPLATES_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'SCHEDULE_TEMPLATES_LOAD_FAILED', data: error.data }));
  }
}

export {
  createScheduleTemplates,
  toggleScheduleTemplate,
  changeScheduleTemplateTime,
  changeAverageServiceTime,
  addError,
  getScheduleTemplates
};
