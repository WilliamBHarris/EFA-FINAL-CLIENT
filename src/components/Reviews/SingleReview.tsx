import React from "react";
import "../../App.css";
import moment from "moment";

export type SingleReviewProps = {
  reviews: any;
  userName: any;
  userId: any;
  reviewId: any;
  setReviewId: any;
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
            <h5>{moment.parseZone(reviews.updatedAt).format("MMMM Do YYYY")}</h5>
            <h3>{reviews.title}</h3>
            <p>{reviews.description}</p>
          </div>
          {reviews.userId === this.props.userId ? (
            <>
              <button onClick={() => this.props.setReviewId(reviews.id)}>
                Delete
              </button>
              <button>Edit</button>
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
