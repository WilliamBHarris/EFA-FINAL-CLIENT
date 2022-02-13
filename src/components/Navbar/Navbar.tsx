import React from "react";
import { MainProps } from "../../App";
import { Link } from "react-router-dom";

export type NavbarProps = {
  isLoggedIn: MainProps["isLoggedIn"];
  sessionToken: MainProps["sessionToken"];
  clearToken: MainProps["clearToken"];
  setSessionToken: MainProps["setSessionToken"];
  role: string;
  name: string;
};

class Navbar extends React.Component<
  {
    isLoggedIn: MainProps["isLoggedIn"];
    sessionToken: MainProps["sessionToken"];
    clearToken: MainProps["clearToken"];
    setSessionToken: MainProps["setSessionToken"];
    role: string
    name: string;
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
      role: this.props.role,
      name: this.props.name
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
          <>
          <h3>{this.props.name}</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
         {this.props.role === 'admin' ? <Link to="/admin">Admin</Link> : null} 
          <Link to="/"><button onClick={this.props.clearToken}>Logout</button></Link>
          </>
        ) : (
          ""
        )}
         
      </div>
      </div>
     
    );
  }
}

export default Navbar;
