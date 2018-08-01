import React, {PureComponent} from 'react'
import {getEvents, createEvent} from '../../../actions/events'
import {createMessage} from '../../../actions/events'
import {getInstagram} from '../../../actions/instagram'
import {getUsers} from '../../../actions/users'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import EventForm from '../events/EventForm'
import MessageForm from '../messages/MessageForm'
import EventsList from '../events/EventsList'
import Grid from '@material-ui/core/Grid';
import InstagramConsole from '../instagram/InstagramConsole'
import './AdminConsole.css'
import logo from '../images/cityhub-logo-black.svg'
import MessageBar from '../messages/MessageBar'

class AdminConsole extends PureComponent {

  createEvent = (event) => {
    this.props.createEvent(event)
  }

  createMessage = (message) => {
    this.props.createMessage(message)
  }

  componentDidMount() {

    this.props.getEvents()
    this.props.getInstagram()

    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers()
    }
  }

  render() {
    const {users} = this.props

    if (users !== null) {
      return (
        <div>

          {/* <button onClick={this.props.getEvents}>Get new events</button> */}
          <div className='header'>
            <img src={logo} width='200px' alt=''/>
            <h1>DASHBOARD</h1>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <MessageForm onSubmit={this.createMessage}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <EventForm onSubmit={this.createEvent} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InstagramConsole instagram={this.props.instagram}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <EventsList />
              </Grid>

            </Grid>
          </div>

          <MessageBar />
        </div>
      )
    }

    if (users === null || users === undefined) {
      return (
        <div>
          <h1>Please login to access the console</h1>
          <Link to="/login">Login</Link>
        </div>
      )
    }




    else return (
      <h1>How did you get here</h1>
    )

  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  instagram: state.instagram === null ? null : state.instagram,
  events: state.events === null ?
    null : Object.values(state.events).sort((a, b) => b.id - a.id)

})

export default connect(mapStateToProps, {getUsers, getEvents, getInstagram, createEvent, createMessage})(AdminConsole)