import React from "react";
import { CartItemType } from "../../App";
import { Link } from "react-router-dom";
import dbCall from "../../helpers/environment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export type ItemProps = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void
  fetchProducts: any;
  setRevId: any;
  handleClose: any;
};

export type ItemState = {
  title: string;
  description: string;
  amount: number | string;
  price: number | string;
  category: string;
  image: string;
  prodId: number;
  open: boolean;
}

class Item extends React.Component<ItemProps, ItemState> { 
      constructor(props: any){
    super(props)
    this.state = {
      prodId: 0,
      open: false,
      title: this.props.item.title,
      description: this.props.item.description,
      price: this.props.item.price,
      amount: this.props.item.amount,
      category: this.props.item.category,
      image: this.props.item.image,
    }
this.productDelete = this.productDelete.bind(this)
this.cancelClear = this.cancelClear.bind(this);
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

  cancelClear = () => {
    this.setState({
      open: false,
    });
    this.props.handleClose();
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleUpdate = () => {
    fetch(`${dbCall}/products/${this.state.prodId}`, {
      method: "PUT",
      body: JSON.stringify({
        product: {
          title: this.state.title,
          description: this.state.description,
          image: this.state.image,
          amount: this.state.amount,
          price: this.state.price,
          category: this.state.category,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      }),
    })
      .then((res) => {
        console.log(res);
        this.props.setRevId('update-p')
        this.setState({
          prodId: this.state.prodId,
          open: false,
        });
      })
      .then(() => {
        this.props.setRevId("");
      })
      .catch((error) => console.log(error));
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
          <button onClick={() => this.setState({ open: true, prodId: this.props.item.id })}>Update</button>
          <button onClick={this.productDelete}>Delete</button>
          <Dialog open={this.state.open} onClose={this.props.handleClose}>
                <DialogTitle>Update Review</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Edit the contents of the review and update.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title:"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Description:"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Price:"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={this.state.price}
                    onChange={(e) => this.setState({ price: e.target.value })}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Amount:"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={this.state.amount}
                    onChange={(e) => this.setState({ amount: e.target.value })}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category:"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={this.state.category}
                    onChange={(e) => this.setState({ category: e.target.value })}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Image:"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={this.state.image}
                    onChange={(e) => this.setState({ image: e.target.value })}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.cancelClear}>Cancel</Button>
                  <Button onClick={this.handleUpdate}>Update</Button>
                </DialogActions>
              </Dialog>
          </div>
      </div>
    );
  }
}

export default Item;
