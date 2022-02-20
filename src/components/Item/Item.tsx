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
  handleAddToCart: (clickedItem: CartItemType) => void;
  fetchProducts: any;
  setRevId: any;
  handleClose: any;
  role: string;
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
};

class Item extends React.Component<ItemProps, ItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      prodId: 0,
      open: false,
      title: this.props.item.title,
      description: this.props.item.description,
      price: this.props.item.price,
      amount: this.props.item.amount,
      category: this.props.item.category,
      image: this.props.item.image,
    };
    this.productDelete = this.productDelete.bind(this);
    this.cancelClear = this.cancelClear.bind(this);
  }

  productDelete = async () => {
    await fetch(`${dbCall}/products/${this.props.item.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      }),
    })
      .then((res) => {
        console.log(res);
        this.props.setRevId("delete-p");
      })
      .then((res) => {
        this.props.setRevId("");
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
        this.props.setRevId("update-p");
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
          <div className="itemImgCenter">
            <Link to={`/products/${this.props.item.id}`}>
              <img
                className="cardImg"
                alt={this.props.item.title}
                src={this.props.item.image}
              />
            </Link>
          </div>
          <div className="itemInfo">
            <h2 className="itemTitle">{this.props.item.title}</h2>
            <p className="itemDescription">{this.props.item.description}</p>
            {/* <h3 className='itemCategory'>{this.props.item.category}</h3> */}
            {/* <h3 className='itemAmount'>{this.props.item.amount}</h3> */}
            <h3 className="itemPrice">${this.props.item.price}</h3>
          </div>
          <div className="itemButtons">
            <button
              className="addCartBtn"
              onClick={() => this.props.handleAddToCart(this.props.item)}
            >
              Add to cart
            </button>
            {this.props.role === "admin" ? (
              <>
                <button
                  className="adminBtn"
                  onClick={() =>
                    this.setState({ open: true, prodId: this.props.item.id })
                  }
                >
                  Update
                </button>
                <button className="adminBtn" onClick={this.productDelete}>
                  Delete
                </button>
              </>
            ) : null}

            <Link className="addCartBtn" to={`/products/${this.props.item.id}`}>
              Reviews
            </Link>
          </div>

          <Dialog open={this.state.open} onClose={this.props.handleClose}>
            <DialogTitle className="updateProdMain">Update Product</DialogTitle>
            <DialogContent className='updateMidBox'>
              <DialogContentText className="updateMainTitle">
                Edit the contents of the product and update.
              </DialogContentText>
              <div className='updateContentBox'>
                <p className='updateLabel'>Title:</p>
              <input
                className="updateProdContent"
                type="text"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              /><p className='updateLabel'>Description:</p>
              <input
                className="updateProdContent"
                type="text"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              /><p className='updateLabel'>Price:</p>
              <input
                className="updateProdContent"
                autoFocus
                type="number"
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
              /><p className='updateLabel'>Image:</p>
              <input
                className="updateProdContent"
                type="text"
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              />
              </div>
            </DialogContent>
            <DialogActions className="updateProdBtn">
              <Button className="updateBtn" onClick={this.cancelClear}>
                Cancel
              </Button>
              <Button className="updateBtn" onClick={this.handleUpdate}>
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Item;
