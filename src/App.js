import React, { Component } from 'react'
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/dashboard/login/LoginPage'
import SignupPage from './components/dashboard/signup/SignupPage'
import LogoutPage from './components/dashboard/logout/LogoutPage'
import AdminConsole from './components/dashboard/main/AdminConsole'
import './App.css'
import TopBar from './components/dashboard/layout/TopBar'
import  TestCarousel  from './components/slider/main/Carousel';
import SingleEvent from './components/singleevent/SingleEvent';

class App extends Component {

  render() {

   const {user} = this.props
    return (
      <Router>
        <div>
          <nav>
            {/* {
              user &&
              <TopBar />
            } */}
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/dashboard" component={AdminConsole} />
            <Route exact path="/carousel/:location" component={TestCarousel} />
            <Route exact path="/singleevent/:id" component={SingleEvent} />
            <Route exact path="/" render={ () => <Redirect to="/dashboard" /> } />
          </main>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})
// export default App
export default connect(mapStateToProps)(App)
