import React from "react";
import dbCall from "../../../helpers/environment";

export type ProductFormProps = {
 
};

export type ProductFormState = {
    title: string;
    description: string;
    amount: number;
    price: number;
    category: string;
    image: string;
    alert: string;
}

class ProductForm extends React.Component <{}, ProductFormState> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: '',
      description: '',
      amount: 0,
      price: 0,
      category: '',
      image: '',
      alert: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };



  createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${dbCall}/products/`, {
      method: "POST",
      body: JSON.stringify({
        product: {
          title: this.state.title,
          description: this.state.description,
          image: this.state.image,
          category: this.state.category,
          amount: this.state.amount,
          price: this.state.price,
        
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
            title: '',
            description: '',
            amount: 0,
            price: 0,
            category: '',
            image: '',
            alert: 'added'
        })
      })
      .catch((error) => console.log(error));
  };

  render(): React.ReactNode {
    return (
      <div className="createMain">
        <div className="createBox">
          <h1 className='adminFormTitle'>List an Item</h1>
          <form className="adminForm" onSubmit={this.createProduct}>
            <div>Title</div>
            <input
            className="inputBox"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <div>Description</div>
            <input
            className="inputBox"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <div>Price</div>
            <input
              className="inputBox"
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <div>Amount</div>
            <input
              className="inputBox"
              type="text"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
            <div>Image</div>
            <input
              className="inputBox"
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
            <div>Category</div>
            <input
              className="inputBox"
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            />
            <button className='adminPageBtn' type="submit">Submit</button>
            {this.state.alert === 'added' ? <p className='itemAdded'>Item Added</p>: null}
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;
