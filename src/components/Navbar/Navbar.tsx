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
    role: string;
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
      name: this.props.name,
    };
  }

  render(): React.ReactNode {
    return (
      <div>
        <div className="navMain">
          <h1 className='navLogo'>graffitees</h1>
          {this.props.sessionToken !== "" ? "" : <Link className="navLink" to="/login">Login</Link>}
          {this.props.sessionToken !== "" ? (
            ""
          ) : (
            <Link className="navLink"  to="/register">Sign Up</Link>
          )}

          {this.props.sessionToken !== "" ? (
            <>
              {this.props.name !== "" ? <h3>{this.props.name}</h3> : null}
              <Link className="navLink"  to="/">Home</Link>
              <Link className="navLink"  to="/products">Products</Link>
              {this.props.role === "admin" ? (
                <Link className="navLink"  to="/admin">Admin</Link>
              ) : null}
              <Link to="/">
                <button onClick={this.props.clearToken}>Logout</button>
              </Link>
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
