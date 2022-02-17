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
      <div>
        <div>
          <div>Create a product:</div>
          <form onSubmit={this.createProduct}>
            <div>Title</div>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <div>Description</div>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <div>Price</div>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <div>Amount</div>
            <input
              type="text"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
            <div>Image</div>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
            <div>Category</div>
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
            {this.state.alert === 'added' ? <p>Item Added</p>: null}
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;
