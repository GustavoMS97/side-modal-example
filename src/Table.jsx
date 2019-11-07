import React from "react";
import "./App.css";
import { TableCell, Checkbox } from "@material-ui/core";
import EnhancedTable from "./EnhancedTable";

class Table extends React.Component {
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
        return (
            <div>
                <EnhancedTable
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    page={this.state.page}
                    rowsPerPage={this.state.rowsPerPage}
                    selected={this.state.selected}
                    onSelect={newSelected =>
                        this.setState({ selected: newSelected })
                    }
                    handleSelectAllClick={e => {
                        if (e.target.checked) {
                            this.setState(state => ({
                                selected: state.data.map(n => n.id)
                            }));
                            return;
                        }
                        this.setState({ selected: [] });
                    }}
                    handleChangeRowsPerPage={event => {
                        this.setState({ rowsPerPage: event.target.value });
                    }}
                    handleChangePage={(event, page) => {
                        this.setState({ page });
                    }}
                    handleRequestSort={(order, orderBy) => {
                        this.setState({ order, orderBy });
                    }}
                    data={this.state.data}
                    rows={[
                        {
                            id: "name",
                            numeric: false,
                            disablePadding: true,
                            label: "Dessert (100g serving)"
                        },
                        {
                            id: "calories",
                            numeric: true,
                            disablePadding: false,
                            label: "Calories"
                        },
                        {
                            id: "fat",
                            numeric: true,
                            disablePadding: false,
                            label: "Fat (g)"
                        },
                        {
                            id: "carbs",
                            numeric: true,
                            disablePadding: false,
                            label: "Carbs (g)"
                        },
                        {
                            id: "protein",
                            numeric: true,
                            disablePadding: false,
                            label: "Protein (g)"
                        }
                    ]}
                    tableRow={(n, isSelected) => {
                        return (
                            <>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected} />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                >
                                    {n.name}
                                </TableCell>
                                <TableCell align="right">
                                    {n.calories}
                                </TableCell>
                                <TableCell align="right">{n.fat}</TableCell>
                                <TableCell align="right">{n.carbs}</TableCell>
                                <TableCell align="right">{n.protein}</TableCell>
                            </>
                        );
                    }}
                ></EnhancedTable>
            </div>
        );
    }
}

export default Table;
