import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Paper
} from "@material-ui/core";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
    }
});

class EnhancedTable extends React.Component {
    state = {};

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.props.orderBy === property && this.props.order === "desc") {
            order = "asc";
        }
        this.props.handleRequestSort(order, orderBy);
    };

    handleClick = (event, id) => {
        const { selected } = this.props;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.props.onSelect(newSelected);
    };

    isSelected = id => this.props.selected.indexOf(id) !== -1;

    getPageNumberOptions = () => {
        let options = [5];
        if (this.props.data && this.props.data.length > 5) {
            options.push(10);
            if (this.props.data.length > 10) {
                options.push(20);
            }
        }
        return options;
    };

    render() {
        const { classes } = this.props;
        const { selected, order, orderBy, rowsPerPage, page } = this.props;
        const data = this.props.data || [];
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            rows={this.props.rows}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.props.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(n => (
                                    <TableRow
                                        hover
                                        onClick={event =>
                                            this.handleClick(event, n.id)
                                        }
                                        role="checkbox"
                                        aria-checked={this.isSelected(n.id)}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={this.isSelected(n.id)}
                                    >
                                        {this.props.tableRow(
                                            n,
                                            this.isSelected(n.id)
                                        )}
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={this.getPageNumberOptions()}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={this.props.handleChangePage}
                    onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(EnhancedTable);
