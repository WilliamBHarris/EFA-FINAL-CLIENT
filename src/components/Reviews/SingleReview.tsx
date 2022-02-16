import React from "react";
import "../../App.css";
import moment from "moment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dbCall from "../../helpers/environment";

export type SingleReviewProps = {
  reviews: any;
  userName: any;
  reviewId: any;
  setReviewId: any;
  handleClose: any;
  handleClickOpen: any;
  setOpen: any;
  open: any;
  setRevId: any;
  revId: any;
  fetchProducts: any;
  userId: string;
  role: string;
};

export type ReviewState = {
  theId: string;
  title: string;
  description: string;
  open: boolean;
  revId: string;
};

class SingleReviews extends React.Component<SingleReviewProps, ReviewState> {
  constructor(props: any) {
    super(props);
    this.state = {
      theId: "",
      title: '',
      description: '',
      open: false,
      revId: "",
    };
    this.mapReviews = this.mapReviews.bind(this);
    this.cancelClear = this.cancelClear.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  cancelClear = () => {
    this.setState({
      open: false,
    });
    this.props.handleClose();
  };

  handleUpdate = () => {
    fetch(`${dbCall}/review/${this.state.revId}`, {
      method: "PUT",
      body: JSON.stringify({
        review: {
          title: this.state.title,
          description: this.state.description,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      }),
    })
      .then((res) => {
        console.log(res);
        this.props.setRevId("");
        this.setState({
          description: this.state.description,
          title: this.state.title,
        });
        this.props.setRevId("update");
        this.props.fetchProducts();
        this.handleClose();
      })
      .then(() => {
        this.props.setRevId("");
      })
      .catch((error) => console.log(error));
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  mapReviews = () => {
    return this.props.reviews.map((reviews: any): JSX.Element => {
      return (
        <div className="reviewMain" key={reviews.id}>
          <div key={reviews.productId}>
            <h2>{this.props.userName}</h2>
            <h5>
              {moment.parseZone(reviews.updatedAt).format("MMMM Do YYYY")}
            </h5>
            <h3>{reviews.title}</h3>
            <p>{reviews.description}</p>
          </div>
          {reviews.userId === this.props.userId ||
          this.props.role === "admin" ? (
            <>
              <button
                onClick={() => {
                  this.props.setRevId("delete");
                  this.props.setReviewId(reviews.id);
                  console.log(reviews);
                }}
              >
                Delete
              </button>

              <Button
                onClick={() => this.setState({ open: true, revId: reviews.id })}
              >
                Edit
              </Button>
              <Dialog open={this.state.open} onClose={this.props.handleClose}>
                <DialogTitle>Update Review</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Edit the contents of the review and update.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title:"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Description:"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.cancelClear}>Cancel</Button>
                  <Button onClick={this.handleUpdate}>Update</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  render(): React.ReactNode {
    return (
      <div>
        {this.props.reviews.length !== 0
          ? this.mapReviews()
          : "No reviews for this item yet!"}
      </div>
    );
  }
}

export default SingleReviews;
