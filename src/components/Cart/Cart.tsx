import React from "react";
import { CartItemType } from "../../App";
import CartItem from "../Cart/CartItem";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  sessionToken: string | null;
};

class Cart extends React.Component<Props> {
  render(): React.ReactNode {
    const calculateTotal = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
    return (
      
      <div className='cartMain'>
        <h2 className='cartTitle'>Items in your cart :</h2>
        <div className="cartItemGrid">
        {this.props.cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={this.props.addToCart}
            removeFromCart={this.props.removeFromCart}
          />
        ))}</div>
        <div className="cartTotal">
          {this.props.cartItems.length === 0 ? <p className='noItemCart'>No items in your cart!</p> : <h2>Total: ${calculateTotal(this.props.cartItems).toFixed(2)}</h2> }
        
        {this.props.sessionToken === '' ? <p className='loginCheckout'>Login or Sign up to checkout</p>: <button className='checkoutBtn'>Checkout</button>}
      </div>
      </div>
    );
  }
}

export default Cart;
