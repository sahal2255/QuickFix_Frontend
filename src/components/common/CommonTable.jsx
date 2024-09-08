import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";  // Import MUI Button
import { styled } from "@mui/material/styles";

// Custom styles using styled API
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
}));

const StyledTableRow = styled(TableRow)(({ theme, isodd }) => ({
    backgroundColor: isodd ? theme.palette.action.hover : "#fff",
    "&:hover": {
        backgroundColor: theme.palette.action.selected,
    },
}));

export default function CommonTable({ columns = [], rows = [], onAllowClick }) {
    const [pg, setPg] = useState(0);
    const [rpg, setRpg] = useState(5);

    function handleChangePage(event, newPage) {
        setPg(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRpg(parseInt(event.target.value, 10));
        setPg(0);
    }

    return (
        <Paper sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="styled table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell key={column.id} align={column.align || "left"}>
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                            <StyledTableRow key={index} isodd={index % 2 === 0}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align || "left"}>
                                    {/* If it's the action column, show the button */}
                                    {column.id === "action" ? (
                                        <Button
                                            variant="contained"
                                            color={row.isEnabled ? "secondary" : "primary"}  // Change button color
                                            onClick={() => onAllowClick(row)}  // Pass vendor data on click
                                        >
                                            {row.isEnabled ? "Enabled" : "Allow"}  {/* Change button text */}
                                        </Button>
                                    ) : (
                                        row[column.id] || 'N/A'
                                    )}
                                </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: "#f5f5f5", borderTop: "1px solid #e0e0e0" }}  // Custom pagination style
            />
        </Paper>
    );
}
