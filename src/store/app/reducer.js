 

import * as Actions from './actions';

const INIT_STATE = {
  showMessage: false,
  message: ""
}

const App = (state = INIT_STATE, action) => {
  switch (action.type) {
    case Actions.SHOW_MESSAGE:
      return {
        ...state,
        message: action.payload,
        showMessage: true
      }
    case Actions.HIDE_MESSAGE:
      return {
        ...state,
        showMessage: false,
        message: ""
      }
    default:
      return state
  }
}

export default App
