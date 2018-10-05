//Middleware
import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

// aanroepen van de middleware, volgorde is belangrijk
export default applyMiddleware(
  thunk,
  logger,
)
