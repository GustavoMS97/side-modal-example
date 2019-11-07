import React from "react";
import "./App.css";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
    Slide
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    paper: {
        minHeight: "100%",
        right: "0 !important",
        top: 0,
        position: "absolute",
        minWidth: "50% !important",
        margin: 0
    }
};

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class App extends React.Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { fullScreen } = this.props;
        const { classes } = this.props;
        let { paper } = classes;
        if (this.props.quarter) {
            paper = { ...paper, minWidth: "75% !important" };
        }
        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    Open responsive dialog
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    classes={{ paper }}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Let Google help apps determine location. This means
                            sending anonymous location data to Google, even when
                            no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button
                            onClick={this.handleClose}
                            color="primary"
                            autoFocus
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(withMobileDialog()(App));
