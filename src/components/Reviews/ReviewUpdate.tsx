import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dbCall from "../../helpers/environment";




export type UpdateProp = {
  title: string;
  description: string;
  cancelClear: boolean;
};

export type ReviewUpdateProps = {
  description: any;
  title: any;
  reviewId: any;
  handleClose: any;
  handleClickOpen: any;
  setOpen: any;
  open: any;
  setRevId: any;
  revId: any;
  theId: string;
};

class ReviewUpdate extends React.Component<ReviewUpdateProps, UpdateProp> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: this.props.title,
      description: this.props.description,
      cancelClear: false,
    };
    this.cancelClear = this.cancelClear.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  cancelClear = () => {
    this.props.handleClose();
    this.props.setRevId(this.props.revId);
  };

  handleUpdate =  () => {
      if(this.props.revId !== ''){
          this.props.setRevId(this.props.revId)
      }
      console.log(this.props.revId)
      console.log(this.state.title)
      console.log(this.state.description)
     fetch(`${dbCall}/review/${this.props.revId}`, {
        method: 'PUT',
        body: JSON.stringify({
          review: {
            title: this.state.title,
            description: this.state.description
          }
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        })
      })
      .then(res => {
        console.log(res)
        this.props.setRevId('')
            this.setState({
                description: this.state.description,
                title: this.state.title
            })
           
          this.props.handleClose()
        
      })
      .catch(error => console.log(error))
  }

  render(): React.ReactNode {
    return (
      <div>
        <Button variant="outlined" onClick={this.props.handleClickOpen}>
          Edit
        </Button>
        <Dialog open={this.props.open} onClose={this.props.handleClose}>
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
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelClear}>Cancel</Button>
            <Button onClick={this.handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ReviewUpdate;
