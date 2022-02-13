import React from "react";
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
        
        <h1>Welcome Admin</h1> 
        
        
        
        
        
        
        : "Not Authorized"}
       
        </>
    )}
}

export default AdminMain;
