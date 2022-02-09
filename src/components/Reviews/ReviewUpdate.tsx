import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/* YOU ARE TRYING TO FIGURE OUT WHY THE THIS.PROPS.TITLE IS JUST PASSING THE SAME ITEM ON ALL THE EDITS. */



export type UpdateProp = {
  title: string;
  description: string;
  clear: boolean;
};

export type ReviewUpdateProps = {
  description: any;
  title: any;
  reviewId: any;
  handleClose: any;
  handleClickOpen: any;
  setOpen: any;
  open: any;
};

class ReviewUpdate extends React.Component<ReviewUpdateProps, UpdateProp> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: this.props.title,
      description: this.props.description,
      clear: false,
    };
    this.clear = this.clear.bind(this);
  }

  clear = () => {
    this.setState({
      title: this.props.title,
      description: this.props.description,
    });
    this.props.handleClose();
    console.log(this.props.reviewId);
  };

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
            <Button onClick={this.clear}>Cancel</Button>
            <Button onClick={this.props.handleClose}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ReviewUpdate;
