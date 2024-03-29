import React from "react";
import "./App.css";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    withMobileDialog,
    Slide,
    IconButton,
    Typography
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Skeleton from "react-loading-skeleton";
import Table from "./Table";

const styles = {
    paper: {
        minHeight: "100%",
        right: "0 !important",
        top: 0,
        position: "absolute",
        minWidth: "50% !important",
        margin: 0
    },
    root: { maxWidth: "50% !important" }
};

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class App extends React.Component {
    state = {
        open: false,
        selected: [],
        data: [
            {
                id: 2,
                name: "Cupcake",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3
            },
            {
                id: 3,
                name: "Cupcake 2",
                calories: 306,
                fat: 3.8,
                carbs: 68,
                protein: 4.4
            },
            {
                id: 4,
                name: "Cupcake",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3
            },
            {
                id: 5,
                name: "Cupcake 2",
                calories: 306,
                fat: 3.8,
                carbs: 68,
                protein: 4.4
            },
            {
                id: 6,
                name: "Cupcake",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3
            },
            {
                id: 7,
                name: "Cupcake 2",
                calories: 306,
                fat: 3.8,
                carbs: 68,
                protein: 4.4
            }
        ],
        order: "asc",
        orderBy: "calories",
        page: 0,
        rowsPerPage: 5
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
                <Skeleton count={5} />
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
                    <div
                        style={{
                            background: "#1976D2",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px"
                        }}
                    >
                        <IconButton
                            color="inherit"
                            onClick={this.handleClose}
                            aria-label="Close"
                        >
                            <Close />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            {
                                "Use Google's location service? Use Google's location service? Use Google's location service?"
                            }
                        </Typography>
                    </div>
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
                <Table />
            </div>
        );
    }
}

export default withStyles(styles)(withMobileDialog()(App));
