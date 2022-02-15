import React from "react";
import ProductForm from "./components/ProductForm";



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
        </div>
        
        
        
        
        
        : "Not Authorized"}
       
        </>
    )}
}

export default AdminMain;
