import React from "react";
import ProductForm from "./components/ProductForm";
import DeleteUser from "./components/DeleteUser";
import { Link } from "react-router-dom";

export type AdminMainProps = {
  role: string;
  name: string;
};

class AdminMain extends React.Component<AdminMainProps> {
  //     constructor(props: any){
  //     super(props)

  // }

  render(): React.ReactNode {
    return (
      <>
        {this.props.role === "admin" ? (
          <div className="productMain">
            <Link to="/">
              <div className="homeLogo"></div>
              <div className="homeLogo2"></div>
            </Link>
            <div className="adminBox">
              <h1 className="adminTitle">Welcome {this.props.name}</h1>
              <ProductForm />
              <DeleteUser />
            </div>{" "}
          </div>
        ) : (
          "Not Authorized"
        )}
      </>
    );
  }
}

export default AdminMain;
