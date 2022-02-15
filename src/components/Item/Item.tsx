import React from "react";
import { CartItemType } from "../../App";
import { Link } from "react-router-dom";
import dbCall from "../../helpers/environment";

export type ItemProps = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void
  fetchProducts: any;
  setRevId: any;
};

class Item extends React.Component<ItemProps> { 
      constructor(props: any){
    super(props)
this.productDelete = this.productDelete.bind(this)
}
  
  productDelete = async () => {
    await fetch(`${dbCall}/products/${this.props.item.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      }),
    }).then((res) => {
      console.log(res)
      this.props.setRevId('delete-p')
    }).then((res) => {
      this.props.setRevId('')
    });
  };

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
          <Link to={`/products/${this.props.item.id}`}>Reviews</Link>
          <button>Update</button>
          <button onClick={this.productDelete}>Delete</button>
          </div>
      </div>
    );
  }
}

export default Item;
