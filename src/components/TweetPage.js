import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class TweetPage extends Component {
  render() {
    const { id, replies } = this.props
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, tweets, users }, props) {
  // wordt nu als prop meegegeven bij het aanroepen van tweetpage. faking
  // wordt binnenkort ingesteld door react router.
  const { id } = props.match.params

  return {
    id, //tweet id, in dit geval uit de url / faking.
    replies: !tweets[id] // elke reply op een tweet. Als er geen tweet bestaat met dit id dan een lege array
      ? []
      : tweets[id].replies.sort((a,b,) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(TweetPage)