import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import tweets from './tweets'
import { loadingBarReducer } from 'react-redux-loading'

// de combinedUsers object voor de aanroep / aanmaken van de store

//We will combine all of these reducers into one main, root reducer, 
//which will combine the results of calling the tweets reducer, 
//users reducer, and authedUser reducer into a single state object. Remember, 
//we need to do this because the createStore function only accepts a single reducer.
export default combineReducers({
  authedUser,
  users,
  tweets,
  loadingBar: loadingBarReducer,
})

// De store zal als volgt eruit zien ivm de default waarden van de reducers
// --Store --
//authedUser : null
//Tweets : {}
//Users : {}

//Each of these reducers will manage just its own part of the state.