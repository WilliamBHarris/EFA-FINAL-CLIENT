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
          <div>
    <div>
      <h3>{this.props.item.title}</h3>
      <div className='information'>
        <p>Price: ${this.props.item.price}</p>
        <p>Total: ${(this.props.item.amount * this.props.item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => this.props.removeFromCart(this.props.item.id)}
        >
          -
        </Button>
        <p>{this.props.item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => this.props.addToCart(this.props.item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={this.props.item.image} alt={this.props.item.title} />
  </div>
      );
    }
  }

// const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
//   <div>
//     <div>
//       <h3>{item.title}</h3>
//       <div className='information'>
//         <p>Price: ${item.price}</p>
//         <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
//       </div>
//       <div className='buttons'>
//         <Button
//           size='small'
//           disableElevation
//           variant='contained'
//           onClick={() => removeFromCart(item.id)}
//         >
//           -
//         </Button>
//         <p>{item.amount}</p>
//         <Button
//           size='small'
//           disableElevation
//           variant='contained'
//           onClick={() => addToCart(item)}
//         >
//           +
//         </Button>
//       </div>
//     </div>
//     <img src={item.image} alt={item.title} />
//   </div>
// );

export default CartItem;