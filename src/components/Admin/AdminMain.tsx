import React from "react";
import ProductForm from "./components/ProductForm";
import DeleteUser from "./components/DeleteUser";



export type AdminMainProps = {
    role: string;
}


class AdminMain extends React.Component<AdminMainProps>  {
//     constructor(props: any){
//     super(props)

// }

render(): React.ReactNode {
    return (
        <>
        {this.props.role === 'admin' ? 
        <div>
        <h1>Welcome Admin</h1> 
        <ProductForm />
        <DeleteUser />
        </div>
        
        
        
        
        
        : "Not Authorized"}
       
        </>
    )}
}

export default AdminMain;
