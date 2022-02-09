import React from "react";
import "../../App.css";
import moment from "moment";
import ReviewUpdate from "./ReviewUpdate";

export type SingleReviewProps = {
  reviews: any;
  userName: any;
  userId: any;
  reviewId: any;
  setReviewId: any;
  handleClose: any;
  handleClickOpen: any;
  setOpen: any;
  open: any;
};

class SingleReviews extends React.Component<SingleReviewProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      reviewId: "",
    };
    this.mapReviews = this.mapReviews.bind(this);
  }

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
          {reviews.userId === this.props.userId ? (
            <>
              <button onClick={() => this.props.setReviewId(reviews.id)}>
                Delete
              </button>
              <ReviewUpdate
                open={this.props.open}
                setOpen={this.props.setOpen}
                handleClickOpen={this.props.handleClickOpen}
                handleClose={this.props.handleClose}
                description={reviews.description}
                title={reviews.title}
                reviewId={reviews.id}
              />
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
