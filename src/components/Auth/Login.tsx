import React from 'react';
import { Navigate} from 'react-router-dom';
import { AppProps} from '../../App';




export type LoginProps = {
  email: string,
  passwordhash: string,
  user: string,
  sessionToken: AppProps['sessionToken']
  updateToken: AppProps['updateToken']
  setSessionToken: AppProps['setSessionToken']
}

class Login extends React.Component<{
  sessionToken: AppProps['sessionToken'], 
  updateToken: AppProps['updateToken'], 
  setSessionToken: AppProps['setSessionToken']
}, LoginProps> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      passwordhash: '',
      user: '',
      sessionToken: this.props.sessionToken,
      setSessionToken: this.props.setSessionToken,
      updateToken: this.props.updateToken,
    }

    this.handleChange = this.handleChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }


  loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          passwordhash: this.state.passwordhash,
        }
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      console.log(json.user.id)
      this.props.updateToken(json.sessionToken);
      this.props.setSessionToken(json.sessionToken)
      this.setState({
        user: json.user.id
      });
    })
    .catch(error => console.log(error))
  }
  
  render(): React.ReactNode {
      return (
        <div>
          <div >
            <div>Login</div>
            <form onSubmit={this.loginUser}>
              <div>Email</div>
              <input type='email' name='email' value={this.state.email} onChange={this.handleChange}/>
              <div>Password</div>
              <input  type='password' name='passwordhash' value={this.state.passwordhash} onChange={this.handleChange}/>
              <button type='submit' >Login</button>
            </form>
            <div>new?</div>
            <div>Sign up here!</div>
          </div>
          {this.state.user !== '' ?  <Navigate to='/' /> : null}
        </div>
      )
  }
}

export default Login;