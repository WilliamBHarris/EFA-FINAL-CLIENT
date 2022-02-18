import React from "react";
import Grid from "@material-ui/core/Grid";
import Item from "../Item/Item";
import { CartItemType } from "../../App";

export type ProductProps = {
  item: CartItemType[];
  handleAddToCart: (clickedItem: CartItemType) => void;
  fetchProducts: any;
  setRevId: any;
  handleClose: any;
};


class Products extends React.Component< ProductProps> {
  render(): React.ReactNode {    
    return (
      <div className="productMain">
      <Grid container spacing={3}>
        {this.props.item?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item handleClose={this.props.handleClose} setRevId={this.props.setRevId} fetchProducts={this.props.fetchProducts} handleAddToCart={this.props.handleAddToCart} item={item} />
          </Grid>
        ))}
      </Grid>
      </div>
    );
  }
}

export default Products;
