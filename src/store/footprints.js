import { combineReducers } from 'redux';
const ADD_USER = 'ADD_USER';
const CHANGE_FOOTPRINT = 'CHANGE_FOOTPRINT';

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  }
}

export function changeFootprint(user, value) {
  return {
    type: CHANGE_FOOTPRINT,
    value: value,
    user
  }
}   

const defaultFootprint = [
  {
    name: 'Victor',
    footprint: 5000,
  }
];

function users(state=defaultFootprint, action) {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          name: action.user,
          footprint: 0
        }
      ];
    case CHANGE_FOOTPRINT:
      const user = state.find(b => action.user === b.name);
      const users = state.filter(b => action.user !== b.name);
      console.log(action);
      return [
        ...users,
        {
          ...user,
          footprint: action.value
        }
      ];
    default:
      return state;
  }
}

const userApp = combineReducers({
  users
});

export default userApp;
