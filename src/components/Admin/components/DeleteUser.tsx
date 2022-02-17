import React from "react";
import dbCall from "../../../helpers/environment";

export type DeleteUserProps = {
 
};

export type DeleteUserState = {
id: number | string;
alert: string;
}

class DeleteUser extends React.Component <{}, DeleteUserState> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: '',
      alert: ''
    };
    // this.handleChange = this.handleChange.bind(this);
  }
//   handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       e.preventDefault()

//     this.setState({
//      id: e.target.value
//     });
//   };


  delete = async (e: any):Promise<void> => {
      e.preventDefault()
    await fetch(`${dbCall}/user/delete/${this.state.id}`, {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        }),
    })
        .then((res) => {
            this.setState({id: ''})
           if(res.status === 200){this.setState({alert: 'User Deleted'})}else if (res.status === 404 || res.status === 500){this.setState({alert: 'Failed to delete User'})}
      return res.json();
    })
  }

  render(): React.ReactNode {
    return (
      <div>
        <div>
          <div>Delete a user:</div>
          <form onSubmit={this.delete}>
            <div>User Id</div>
            <input
              type="text"
              name="title"
              value={this.state.id}
              onChange={(e) => {e.preventDefault()
            this.setState({id: e.target.value})
            }}
            />
             <button type="submit">Delete</button>
           </form>
           {this.state.alert}
           </div>
      </div>
    );
  }
}

export default DeleteUser;
