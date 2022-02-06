import React from "react";
import { MainProps } from "../../App";
import { Link } from "react-router-dom";

export type NavbarProps = {
  isLoggedIn: MainProps["isLoggedIn"];
  sessionToken: MainProps["sessionToken"];
  clearToken: MainProps["clearToken"];
  setSessionToken: MainProps["setSessionToken"];
};

class Navbar extends React.Component<
  {
    isLoggedIn: MainProps["isLoggedIn"];
    sessionToken: MainProps["sessionToken"];
    clearToken: MainProps["clearToken"];
    setSessionToken: MainProps["setSessionToken"];
  },
  NavbarProps
> {
  constructor(props: NavbarProps) {
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      sessionToken: this.props.sessionToken,
      clearToken: this.props.clearToken,
      setSessionToken: this.props.setSessionToken,
    };
  }

  render(): React.ReactNode {
    return (
      <div>
      <div className="navMain">
        {this.props.sessionToken !== "" ? '' : <Link to="/login">Login</Link>}
        {this.props.sessionToken !== "" ? (
          ""
        ) : (
          <Link to="/register">Sign Up</Link>
        )}

        {this.props.sessionToken !== "" ? (
          <button onClick={this.props.clearToken}>Logout</button>
        ) : (
          ""
        )}
         
      </div>
      </div>
     
    );
  }
}

export default Navbar;
