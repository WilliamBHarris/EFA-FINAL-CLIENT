import React from 'react'
import { CartItemType } from '../../App';
import Button from '@material-ui/core/Button';


type Props = {
  item: CartItemType;
  removeFromCart: (id: number) => void;
  addToCart: (clickedItem: CartItemType) => void;
};

class CartItem extends React.Component<Props> {
    render(): React.ReactNode {
      return (
          <div >
    <div className='cartItemInfo'>
    <img className='cartImg' src={this.props.item.image} alt={this.props.item.title} />
      <h3>{this.props.item.title}</h3>
      <div className='information'>
        <p>Price: ${this.props.item.price}</p>
        <p>Total: ${(this.props.item.amount * this.props.item.price).toFixed(2)}</p>
      </div>
      <div className='cartButtons'>
        <button
        className='btn'
          onClick={() => this.props.removeFromCart(this.props.item.id)}
        >
          -
        </button>
        <p className='cartItemAmount'>{this.props.item.amount}</p>
        <button
        className='btn'
          onClick={() => this.props.addToCart(this.props.item)}
        >
          +
        </button>
      </div>
    </div>
    
  </div>
      );
    }
  }

export default CartItem;