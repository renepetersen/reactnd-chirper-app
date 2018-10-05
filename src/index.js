import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'

//Now that all of our reducers are set up, we need to actually create the store and provide it to our application. To actually use any of the code that we've written up to this point, we need to install the redux package. Then, to provide the store to our application, we'll also need to install the react-redux package.
//So install these packages and then restart your terminal:
//yarn add react-redux redux
import { createStore } from 'redux'

import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware' //import de default export comming from index.js file uit de middleware folder.  

//aanmaken vd store. 
// store is op de hoogte van de middleware en de reducers
const store = createStore(reducer, middleware)
//Redux applications have a single store. We have to pass the Root Reducer to our createStore() function in order 
//for the store to know what pieces of state it should have. The point of creating a store is to allow components to be able 
//to access it without having to pass the data down through multiple components.


ReactDOM.render(
//The Provider component (which comes from the react-redux package) makes it possible for all components 
//to access the store via the connect() function.
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root')
)