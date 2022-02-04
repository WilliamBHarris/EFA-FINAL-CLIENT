import React from "react";
import { CartItemType } from "../../App";
import { Link } from "react-router-dom";

export type ItemProps = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void
};

class Item extends React.Component<ItemProps> {
  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <div className="itemCard">
          <img alt={this.props.item.title} src={this.props.item.image} />
          <h1>{this.props.item.title}</h1>
          <h1>{this.props.item.description}</h1>
          <h1>{this.props.item.category}</h1>
          <h1>{this.props.item.amount}</h1>
          <h1>{this.props.item.price}</h1>
          <button onClick={() => this.props.handleAddToCart(this.props.item)}>Add to cart</button>
          <Link to="/reviews"><p>Reviews</p></Link>
          </div>
      </div>
    );
  }
}

export default Item;
