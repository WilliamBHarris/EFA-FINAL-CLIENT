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
      <div className="navMain">
        <div className='navBox'>
          
          {this.props.sessionToken !== "" ? "" : <><Link className="navLink" to="/login">Login</Link><Link className="navLink"  to="/products">Shop</Link></>}
          {this.props.sessionToken !== "" ? (
            ""
          ) : (
            <Link className="navLink"  to="/register">Sign Up</Link>
          )}

          {this.props.sessionToken !== "" ? (
            <div className='navBox'>              
              <Link className="navLink"  to="/products">Shop</Link>
              <Link className="navLink"  to="/products">About</Link>
              <Link className="navLink"  to="/contact">Contact</Link>
              {this.props.role === "admin" ? (
                <Link className="navLink"  to="/admin">Admin</Link>
              ) : null}
              
            </div>
          ) : (
            ""
          )}
        </div>
        {this.props.name !== "" ? <div><p className="userName">Welcome {this.props.name}!</p>
                <Link to="/"><button className="navButton"  onClick={this.props.clearToken}>Logout</button></Link></div>
               : null}
      </div>
    );
  }
}

export default Navbar;
