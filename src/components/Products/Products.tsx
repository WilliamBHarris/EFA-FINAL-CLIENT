import React from "react";
import Grid from "@material-ui/core/Grid";
import Item from "../Item/Item";
import { CartItemType } from "../../App";

export type ProductProps = {
  item: CartItemType[];
  handleAddToCart: (clickedItem: CartItemType) => void;
  fetchProducts: any;
  setRevId: any;
};

class Products extends React.Component< ProductProps> {
  render(): React.ReactNode {    
    return (
      <Grid container spacing={3}>
        {this.props.item?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item setRevId={this.props.setRevId} fetchProducts={this.props.fetchProducts} handleAddToCart={this.props.handleAddToCart} item={item} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Products;
