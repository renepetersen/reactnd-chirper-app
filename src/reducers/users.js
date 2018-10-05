// The users reducer will determine how the users part of the state changes
import { RECEIVE_USERS } from '../actions/users'

// a default state parameter as the first argument inside a particular reducer function.

//De reducers zullen de state 'modifien'
//In our app, we initialized each slice of the store by setting a default state value as the first parameter inside each reducer function.
export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        //Merge state en action.tweets object met bestaand object. ES6 spread operator
        ...state,
        ...action.users
      }
    default :
      return state
  }
}