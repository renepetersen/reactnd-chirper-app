import React, { Component, Fragment } from 'react' // Fragment ?
import { BrowserRouter as Router, Route } from 'react-router-dom' // BrowserRouter wordt hier hernoemd naar Router
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    // vreemde constructie met de props.dispatch... manier om altijd iets aan te roepen dacht ik.
    // aanroepen van de thunk-actionCreator in shared.js
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      //Wanneer loading true is dan niks doen anders Dashboard component laden. of nu iets anders (new tweet)
      // Onderstaand oude variant zonder React Router
      // <div>
      //   <LoadingBar />
      //   {this.props.loading === true
      //     ? null
      //     : <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}/>}
      // </div>

      <Router>
        {/* Omdat Loadingbar en div.container twee elementen zijn en niet genest zijn in een div
         voor react wordt hier nu Fragment gebruikt. Fragment voegt geen extra elementen toe aan de dom.
         Andere oplossing was een lege div geweest maar die wordt wel toegevoegd aan de dom*/}
        <Fragment>  
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div> 
                  {/* IPV individuele componenten renderen gaan we nu routes instellen */}
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    // loading will be true als authedUser is null.
    // loading komt als prop beschikbaar in het component.
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

// Using the connect() function upgrades a component to a container. 
// Containers can read state from the store and dispatch actions.