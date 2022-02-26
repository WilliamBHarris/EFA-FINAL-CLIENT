import React from "react";
import dbCall from "../../helpers/environment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export type UserProps = {
  user: any;
  setUserUpdate: any;
};

type UserState = {
  firstName: string;
  lastName: string;
  location: string;
  image: string;
  email: string;
  password: string;
  responseCode: number;
  open: boolean;
};

class UserProfile extends React.Component<UserProps, UserState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      image: this.props.user.image,
      location: this.props.user.location,
      email: this.props.user.email,
      password: this.props.user.passwordhash,
      responseCode: 0,
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  updateUserInfo = async (): Promise<void> => {
    console.log("update user info");
    await fetch(`${dbCall}/user/edit/${this.props.user.userId}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          role: this.props.user.role,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          location: this.state.location,
          email: this.state.email,
          image: this.state.image,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      }),
    })
      .then((res) => {
        this.setState({
          responseCode: res.status,
        });
        console.log(res);
        return res.json();
      })
      .then((res) => console.log(res))
      .then(() => {
        this.setState({ open: false });
        if (this.state.responseCode === 200) {
          this.props.setUserUpdate("update");
        }
      })
      .catch((error) => console.log(error));
  };

  cancelClear = () => {
    this.setState({ open: false });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render(): React.ReactNode {
    return (
      <div className="userProfileMain">
        <div className="userBox">
          <h1>
            Hello {this.props.user.firstName} {this.props.user.lastName}!
          </h1>
          <img
            className="mainProfileImage"
            alt=""
            src={this.props.user.image}
          />
          <p>
            {this.props.user.firstName} {this.props.user.lastName}
          </p>
          <p>{this.props.user.location}</p>
          <p>{this.props.user.email}</p>
          <button
            onClick={() =>
              this.setState({
                open: true,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                location: this.props.user.location,
                email: this.props.user.email,
                password: this.props.user.passwordhash,
                image: this.props.user.image
              })
            }
          >
            Edit
          </button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle className="updateProdMain">
              Update Your Information
            </DialogTitle>
            <DialogContent className="updateMidBox2">
              <DialogContentText className="updateMainTitle">
                Edit your user information and update.
              </DialogContentText>
              <p className="updateLabel">First Name:</p>
              <input
                className="updateProdContent"
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
              <p className="updateLabel">Last Name:</p>
              <input
                className="updateProdContent"
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
              <p className="updateLabel">Image:</p>
              <input
                className="updateProdContent"
                type="text"
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              />
              <p className="updateLabel">Location:</p>
              <input
                className="updateProdContent"
                type="text"
                value={this.state.location}
                onChange={(e) => this.setState({ location: e.target.value })}
              />
              <p className="updateLabel">Email:</p>
              <input
                className="updateProdContent"
                type="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <p className="updateLabel">Password:</p>
              <input
                className="updateProdContent"
                type="password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </DialogContent>
            <DialogActions className="updateProdBtn">
              <Button className="updateBtn" onClick={this.cancelClear}>
                Cancel
              </Button>
              <Button className="updateBtn" onClick={this.updateUserInfo}>
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default UserProfile;
