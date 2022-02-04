import React from "react";
import { CartItemType } from "../../App";
import SingleReviews from "./SingleReview";
import { Grid } from "@material-ui/core";

export type ReviewProps = {
  item: CartItemType[];
};

class Reviews extends React.Component<ReviewProps> {
  render(): React.ReactNode {
    return (
      <div>
        <h1>Reviews</h1>
        <p>Description</p>
        <Grid container spacing={3}>
          {this.props.item?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <SingleReviews item={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Reviews;
