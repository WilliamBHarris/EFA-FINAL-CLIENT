import React from "react";
import "../../App.css";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dbCall from "../../helpers/environment";

export type SingleReviewProps = {
  reviews: any;
  name: any;
  reviewId: any;
  setReviewId: any;
  handleClose: () => void;
  handleClickOpen: () => void;
  setOpen: any;
  open: string;
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
      title: "",
      description: "",
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
          description: "",
          title: "",
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
            <h2 className="reviewBoxTitle">
              
              {reviews.userName}
              <span className="dateTime">
                - {moment.parseZone(reviews.updatedAt).format("MMMM Do YYYY")}
              </span>
            </h2>
            <h3 className="reviewSingleTitle">{reviews.title}</h3>
            <p className="reviewSingleDescription">{reviews.description}</p>
          </div>
          {reviews.userId === this.props.userId ||
          this.props.role === "admin" ? (
            <>
              <div className="reviewBtn">
                <button
                  className="addCartBtn"
                  onClick={() => {
                    this.props.setRevId("delete");
                    this.props.setReviewId(reviews.id);
                    console.log(reviews);
                  }}
                >
                  Delete
                </button>

                <button
                  className="addCartBtn"
                  onClick={() =>
                    this.setState({
                      open: true,
                      revId: reviews.id,
                      title: reviews.title,
                      description: reviews.description,
                    })
                  }
                >
                  Edit
                </button>
              </div>
              <Dialog open={this.state.open} onClose={this.props.handleClose}>
                <DialogTitle className="updateProdMain">
                  Update Review
                </DialogTitle>
                <DialogContent className="updateMidBox2">
                  <DialogContentText className="updateMainTitle">
                    Edit the contents of the review and update.
                  </DialogContentText>
                  <p className='updateLabel'>Title:</p>
                  <input
                    className="updateProdContent"
                    type="text"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />
                  <p className='updateLabel'>Description:</p>
                  <input
                    className="updateProdContent"
                    type="text"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                </DialogContent>
                <DialogActions className="updateProdBtn">
                  <Button className="updateBtn" onClick={this.cancelClear}>
                    Cancel
                  </Button>
                  <Button className="updateBtn" onClick={this.handleUpdate}>
                    Update
                  </Button>
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
        {this.props.reviews.length !== 0 ? (
          this.mapReviews()
        ) : (
          <p className="noReviews">Be the first to review this item!</p>
        )}
      </div>
    );
  }
}

export default SingleReviews;
