import React from "react";
import SingleReviews from "../Reviews/SingleReview";
import { MainProps } from "../../App";
import dbCall from "../../helpers/environment";
import { Link } from "react-router-dom";

export type ProductState = {
  productId: string;
  title: string;
  description: string;
  image: string;
  price: number;
  amount: number;
  category: string;
  id: string;
  userName: string;
  reviews: any;
  prodDescription: string;
  prodTitle: string;
  reviewId: string;
};

export type TokenProp = {
  sessionToken: MainProps["sessionToken"];
  setSessionToken: MainProps["setSessionToken"];
  setReviewId: any;
  reviewId: string;
  setReviewTotal: any;
  handleClose: () => void;
  handleClickOpen: () => void;
  setOpen: any;
  open: any;
  setRevId: any;
  revId: any;
  fetchProducts: any;
  userId: string;
  role: string;
  name: any;
};

class SingleProduct extends React.Component<TokenProp, ProductState> {
  constructor(props: any) {
    super(props);

    this.state = {
      productId: window.location.pathname.slice(10, 70),
      prodTitle: "",
      title: "",
      description: "",
      prodDescription: "",
      price: 0,
      amount: 0,
      category: "",
      image: "",
      id: "",
      userName: "",
      reviews: [{ id: "", title: "", description: "" }],
      reviewId: "",
    };
  }

  fetchProducts = async (): Promise<void> => {
    await fetch(`${dbCall}/products/${this.state.productId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          prodTitle: res.title,
          image: res.image,
          prodDescription: res.description,
          reviews: [...res.reviews],
          userName: `${res.user.firstName} ${res.user.lastName}`,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate() {
    if (
      this.props.revId === "add" ||
      this.props.revId === "update" ||
      this.props.revId === "delete" ||
      this.props.revId === "delete-p" ||
      this.props.revId === "update-p"
    )
      this.fetchProducts();
  }

  componentWillUnmount() {
    this.fetchProducts();
  }

  addReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${dbCall}/review/${this.state.productId}`, {
      method: "POST",
      body: JSON.stringify({
        review: {
          title: this.state.title,
          description: this.state.description,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
      .then((res) => {
        console.log(res);
        this.props.setRevId("add");
      })
      .then(() => {
        this.props.setRevId("");
        this.setState({
          title: "",
          description: "",
          userName: `${this.props.name}`
        });
      })
      .then(() => {
        this.props.setRevId("");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render(): React.ReactNode {
    return (
      <div className="productMain">
        <div className="homeLogo"></div>
        <div className="homeLogo2"></div>

        <div className="singleMain">
          <div >
          <form  onSubmit={this.addReview}>
            <div className="singleItemBox">
              <img
                className="cardImgSingle"
                src={this.state.image}
                alt={this.state.prodTitle}
              />
              <div className='singleProdInfo'>
              <h2>{this.state.prodTitle}</h2>
              <p>{this.state.prodDescription}</p>
</div>
          <div className='singleFormBox'>
              <h3>Add a review:</h3>
              <p>Title:</p>
              <input
              className='inputBox'
                type="text"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
              <p>Description:</p>
              <input
              className='inputBox'
                type="text"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
              <br />
              <button className='adminPageBtn' type="submit">Submit</button></div>
            </div>
          </form></div>
          <div className="reviewContainer">
            <h1 className="reviewMainTitle">Reviews ({this.state.reviews.length})</h1>
            <SingleReviews
              setReviewId={this.props.setReviewId}
              reviewId={this.props.reviewId}
              reviews={this.state.reviews}
              handleClose={this.props.handleClose}
              handleClickOpen={this.props.handleClickOpen}
              setOpen={this.props.setOpen}
              open={this.props.open}
              setRevId={this.props.setRevId}
              revId={this.props.revId}
              fetchProducts={this.props.fetchProducts}
              userId={this.props.userId}
              role={this.props.role}
              userName={this.state.userName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
