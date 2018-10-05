// In our app, the tweets reducer will determine how the tweets part of the state changes.
import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

// a default state parameter as the first argument inside a particular reducer function.

//Naam van de reducer.
//De reducers zullen de state 'modifien'
// In our app, we initialized each slice of the store by setting a default state value as the first parameter inside each reducer function.
export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
      return {
        //Merge state en action.tweets object met bestaand object. ES6 spread operator
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET :
      return { // Start van een nieuw object
        //Merge state (importeer de hele state in een nieuwe object)
        ...state,
        [action.id]: { // tweet met id wordt een nieuw object. action geven we namelijk mee aan de tweets reducer
          ...state[action.id], //Alle properties van bestaande object worden overgenomen.
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET :
    // ook hier destructureing.
      const { tweet } = action

      let replyingTo = {}
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id]) 
            // replies object prop wordt gevuld met een concat (plak) functie van de nieuwe tweet.,
            //ziet moeilijker uit dan is maar "state[tweet.replyTo].replies" is de selector.
          }
        }
      }

      return {
        ...state, // huidige state importeren.
        [action.tweet.id]: action.tweet, //hier wordt alleen de tweet toegevoegd aan de 
        ...replyingTo,
      }
    default :
      return state
  }
}