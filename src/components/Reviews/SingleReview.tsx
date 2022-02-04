import React from "react";
import { CartItemType } from "../../App";

export type SingleReviewProps = {
  item: CartItemType;
};

class SingleReviews extends React.Component<SingleReviewProps> {
  render(): React.ReactNode {
    return (
      <div>
        <h3>Title</h3>
        <p>Content</p>
        <p>{this.props.item.image}</p>
      </div>
    );
  }
}

export default SingleReviews;
