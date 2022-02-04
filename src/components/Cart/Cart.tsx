import React from 'react';
import { CartItemType } from '../../App';
import CartItem from '../Cart/CartItem'

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

class Cart extends React.Component<Props>{
  render(): React.ReactNode {
    const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
    return (
      <div>      <h2>Your Shopping Cart</h2>
    {this.props.cartItems.length === 0 ? <p>No items in cart.</p> : null}
     {this.props.cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={this.props.addToCart}
          removeFromCart={this.props.removeFromCart}
          
        />
      ))}
      <h2>Total: ${calculateTotal(this.props.cartItems).toFixed(2)}</h2>
      <button>Checkout</button>
    </div>
    );
  }
}

// const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
//   const calculateTotal = (items: CartItemType[]) =>
//     items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

//   return (
//     <div>
//       <h2>Your Shopping Cart</h2>
//      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
//       {cartItems.map(item => (
//         <CartItem
//           key={item.id}
//           item={item}
//           addToCart={addToCart}
//           removeFromCart={removeFromCart}
//           handleAddToCart={this.props.handleAddToCart}
          
//         />
//       ))}
//       <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
//       <button>Checkout</button>
//     </div>
//   );
// };

export default Cart;