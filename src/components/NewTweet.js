import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets' //de actioncreator die in dit comp aangeroepen wordt.
import { Redirect } from 'react-router-dom' 

class NewTweet extends Component {
  //controlled component, react is in control vd tekst van het input veld. Dit ivm de submit button die geactiveerd moet worden.
  state = { // de component state. state wordt alleen in comp gebruikt. Als het op meerdere schermen gebruikt zou worden dan was redux store makkelijk geweest.
    text: '',
    toHome: false,
  }
  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state  // hier wordt de text weer uit de component state gehaald.
    const { dispatch, id } = this.props //vreemd dat dispatch weer uit props moet komen...

    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: '',
      toHome: id ? false : true, //als we replyen op een tweet dan niet terug naar homeview
    }))
  }
  render() {
    // destructure uit de component state.
    const { text, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />  //dit is de redirect naar home
    }

    const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        {/* wanneer formulier verstuurd wordt zal handleSubmit aangeroepen worden. */}
        <form className='new-tweet' onSubmit={this.handleSubmit}> 
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          {/* Als aantal character minder is dan 100 ga dan door */}
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}> 
            {/* disabled als text leeg is */}
              Submit
          </button>
        </form>
      </div>
    )
  }
}

//connected component. Toegang tot de redux store dus toegang tot dispatch.
export default connect()(NewTweet)