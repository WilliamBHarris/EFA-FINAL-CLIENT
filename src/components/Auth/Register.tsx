import React from "react";
import { MainProps } from "../../App";
import dbCall from "../../helpers/environment";
import { Navigate } from "react-router-dom";

export type Props = {
  image: string;
  location: string;
  firstName: string;
  lastName: string;
  email: string;
  user: string;
  passwordhash: string;
  sessionToken: MainProps["sessionToken"];
  updateToken: MainProps["updateToken"];
  setSessionToken: MainProps["setSessionToken"];
};

class Register extends React.Component<
  {
    sessionToken: MainProps["sessionToken"];
    updateToken: MainProps["updateToken"];
    setSessionToken: MainProps["setSessionToken"];
  },
  Props
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      location: "",
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      user: "",
      passwordhash: "",
      sessionToken: this.props.sessionToken,
      setSessionToken: this.props.setSessionToken,
      updateToken: this.props.updateToken,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${dbCall}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          passwordhash: this.state.passwordhash,
          location: this.state.location,
          image: this.state.image,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          user: json.user.id,
        });
        this.props.updateToken(json.sessionToken);
      })
      .catch((error) => console.log(error));
  };

  render(): React.ReactNode {
    return (
      <div>
        <div>
          <div>Sign Up</div>
          <form onSubmit={this.registerUser}>
            <div>First Name</div>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <div>Last Name</div>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <div>Email</div>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div>Password</div>
            <input
              type="text"
              name="passwordhash"
              value={this.state.passwordhash}
              onChange={this.handleChange}
            />
            <div>image</div>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
            <div>location</div>
            <input
              type="location"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        {this.state.user !== "" ? <Navigate to="/" /> : null}
      </div>
    );
  }
}

export default Register;
