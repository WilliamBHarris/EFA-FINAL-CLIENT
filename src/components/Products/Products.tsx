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
          <div className="gridTopper">Filter:
          <button className='filterBtn'>All</button>
          <button className='filterBtn'>Tops</button>
          <button className='filterBtn'>Bottoms</button>
          <button className='filterBtn'>Footwear</button>
          <p>Search:</p>
          <input className='searchInput' />
          </div>
      <Grid container spacing={3}>
        {this.props.item.length !== 0 ? this.props.item.map((item) => (
          <Grid item key={item.id} xs={12} sm={3}>
            <Item role={this.props.role} handleClose={this.props.handleClose} setRevId={this.props.setRevId} fetchProducts={this.props.fetchProducts} handleAddToCart={this.props.handleAddToCart} item={item} />
          </Grid>
        )) : <h1 className="noProductMessage">No products to display... Try again later.</h1>}
      </Grid>
      </div>
      </div>
    );
  }
}

export default Products;
