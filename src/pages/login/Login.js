import React, { Component } from 'react'
import {graphql} from "react-relay";
import {fetchQuery} from "relay-runtime";
import environment from '../../router/Environment';

class Login extends Component {

  state = {
    username: '',
    password: '',
    name: ''
  };

  render() {

    return (
      <div>
        <h4 className='mv3'>Login</h4>
        <div className='flex flex-column'>
          <input
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            type='text'
            placeholder='Your username'
          />
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <div
            className='pointer mr2 button'
            onClick={() => this._confirm()}
          >
            login
          </div>
        </div>
      </div>
    )
  }

  _confirm = async () => {
    console.log(this.state);
    const loginQuery = graphql`
      query LoginQuery($username: String!, $password: String!){
        login(username: $username, password: $password){
          access_token
        }
      }
    `;

    var variables = {
      username: this.state.username,
      password: this.state.password
    };

    fetchQuery(environment, loginQuery, variables).then(data => {
      localStorage.setItem('jwt', data.login.access_token);
      window.location.href = '/home'
    })


  };

}

export default Login
