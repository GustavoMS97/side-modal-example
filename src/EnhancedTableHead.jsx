import React from "react";
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Checkbox,
    Tooltip
} from "@material-ui/core";

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {this.props.rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? "right" : "left"}
                                padding={
                                    row.disablePadding ? "none" : "default"
                                }
                                sortDirection={
                                    orderBy === row.id ? order : false
                                }
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={
                                        row.numeric
                                            ? "bottom-end"
                                            : "bottom-start"
                                    }
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

export default EnhancedTableHead;
