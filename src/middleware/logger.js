// Middleware pattern : 
//const logger = (store) => (next) => (action) => {
 // ...
//}

//Middleware
//This middleware function will help us view the actions and state of the store as we interact with our application. 
//Also, since the handleInitialData() action creator in src/actions/shared.js returns a function, we'll need to install 
//the react-thunk package:
//yarn add redux-thunk
const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const returnValue = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return returnValue
}

export default logger


// The variable logger is assigned to a function that takes the store as its argument. 
//That function returns another function, which is passed next (which is the next middleware in line or the dispatch function). 
//That other function return another function which is passed an action. 
//Once inside that third function, we have access to store, next, and action.
// It’s important to note that the value of the next parameter will be determined by the applyMiddleware function. 
//Why? All middleware will be called in the order it is listed in that function. 
//In our case, the next will be dispatch because logger is the last middleware listed in that function.
