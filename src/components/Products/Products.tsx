import React from "react";
import Grid from "@material-ui/core/Grid";
import Item from "../Item/Item";
import { CartItemType } from "../../App";
import { Link } from "react-router-dom";

export type ProductProps = {
  item: CartItemType[];
  handleAddToCart: (clickedItem: CartItemType) => void;
  fetchProducts: any;
  setRevId: any;
  handleClose: any;
  role: string;
};


class Products extends React.Component< ProductProps> {
  render(): React.ReactNode {    
    return (
      <div className="productMain">
        
        <Link to="/"><div className="prodLogo"></div></Link>
        <div className="prodLogo2"></div>
       
        <div className="mainGrid">
      <Grid container spacing={3}>
        {this.props.item?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item role={this.props.role} handleClose={this.props.handleClose} setRevId={this.props.setRevId} fetchProducts={this.props.fetchProducts} handleAddToCart={this.props.handleAddToCart} item={item} />
          </Grid>
        ))}
      </Grid>
      </div>
      </div>
    );
  }
}

export default Products;
