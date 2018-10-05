//importeren van de getInitialData-function
import { getInitialData } from '../utils/api'

//importeren van de actioncreators
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

//Vast zetten van ingelogde gebruiker. Inlog funct wordt hier niet gemaakt.
const AUTHED_ID = 'tylermcginnis'

// thunk action creator
export function handleInitialData () {
  // Thunk pattern to make an asynch request in de function
  // Action creator zal een functie returnen ipv object. Middleware zal hier dus nog iets mee moeten doen om aan de reducer aan te bieden.
  return (dispatch) => {
    dispatch(showLoading())
    // aanroepen van een function
    return getInitialData()
      //will return a promise
      //ophalen uit de database.
      .then(({ users, tweets }) => {
        // aanroepen van de actioncreators met meegegeven de users en tweets als argument.
        // toevoegen van info aan de store.
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}