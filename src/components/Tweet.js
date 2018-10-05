import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom' 

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, tweet, authedUser } = this.props

    //aanroepen van action-creator (async variant) 
    //die vervolgens de echte action creator aanroept
    //dit gaat door naar de reducers.
    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`) //ongebruikelijk, alleen mogelijk met withRouter
  }
  render() {
    // destructuring
    const { tweet } = this.props

    // Wat als tweet niet bestaat dan een nette return teruggeven.
    if (tweet === null) {
      return <p>This Tweet doesn't exists</p>
    }

    // destructuring properties uit object wat we nodig hebben
    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = tweet

    return (
      // div is een link element geworden, onderdeel van react router
      <Link to={`/tweet/${id}`} className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            
            {/* Als parent true is dan dit block uitvoeren, en parent is al gechecked in de mapStateToProps function */}
            {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}

            <p>{text}</p>
          </div>
          
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            {/* als replies niet gelijk is aan 0 dan doorgaan en tonen van replies */}
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartOutline className='tweet-icon'/>}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}

// objecten uit de state uit de store, en props die meegegeven zijn aan het component
//The important thing to notice here is that mapStateToProps accepts two arguments:
//the state of the store
//the props passed to the Tweet component
function mapStateToProps ({authedUser, users, tweets}, { id }) {
  
  // betreffende tweet, matchend met id uit array selecteren
  const tweet = tweets[id]
  
  //uitzoeken of er een parenttweet is: tweet.replyingTo geeft een id terug. 
  //Deze id meegeven aan tweets geeft weer een nieuwe tweet terug (de parenttweet)
  //voorkomen dat de constructie stuk gaat als tweet niet geldig is. Dus check of tweet bestaat dan ... anders null.
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return {
    //ingelogde user terug geven en de tweet welke geformat wordt. Dit zijn dus props die teruggegeven worden.
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

// connected component met de redux state. oud = En ook nog eens react Router
// tweet component is niet gerenderd met react router daarvoor is withRouter 
export default withRouter(connect(mapStateToProps)(Tweet))