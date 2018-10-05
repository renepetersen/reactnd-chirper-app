// importeren van de api
import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

// de action-types. 
// receive_tweets benaming ivm het ontvangen van de tweets uit de api / database
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

// Action creator
function addTweet (tweet) { // tweet als argument
  return { // returnt een action...
    type: ADD_TWEET,
    tweet,
  }
}

// Action creator, async
export function handleAddTweet (text, replyingTo) {
  return (dispatch, getState) => {   // we returnen hier een function naar redux thunk middleware en geeft een getState function mee zodat we die weer kunnen aanroepen.
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then((tweet) => dispatch(addTweet(tweet))) // als saveTweet actie gedaan is dan deze dispatch actie
      .then(() => dispatch(hideLoading())) // daarna deze dispatch actie in volgorde.
  }
}


// Action creator waarin we tweets meegeven als argument
//Gaat naar de reducer ?
export function receiveTweets (tweets) {
  //returnt een object of een action
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

//Action-creator maar deze wordt niet geexporteerd. Dit gebeurt onderstaand in de handleToggleTweet.
function toggleTweet ({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

// async action creator waarin toggleTweet wordt aangeroepen maar ook een ajax call naar saveLikeToggle
// Thunk action-creator
export function handleToggleTweet (info) {
  return (dispatch) => {
    // optimistic update, Voordat api call is gedaan is de dispatch toggleTweet al gedaan. Ervanuitgaande dat dit kon.
    dispatch(toggleTweet(info))

    //Api database actie. 
    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e)
        
        // optimistic update, terug zetten hoe het was.
        dispatch(toggleTweet(info))
        alert('The was an error liking the tweet. Try again.')
      })
  }
}