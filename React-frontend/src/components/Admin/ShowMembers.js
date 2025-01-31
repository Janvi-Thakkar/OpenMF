/*
    Functional component to list
    all the members(extractor and management)
    of an admin.
*/

import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Container,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/actions/admin';
import TablePaginationActions from '../Utils/TablePaginationActions';
import { extractor_default, fetch_extracted_cases } from '../../store/actions/extractor';
import SelectItem from '../Utils/SelectItem';



// Columns for table representation
const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Full Name', flex:1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'varified', headerName: 'Varified', flex:1},
    { field: 'role', headerName: 'Role', flex: 1},

]

// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: 600,
    },
    table: {
        height: '41vh',
        width: '70vw',
        minWidth: '50vw',
        maxWidth: '100vw',
        '&:focus': {
            outline: 'none',
            border: 'none'
        }
    },
    button: {
        fontSize: '.8rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    }
}))

// Styling For cells
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);


// Styling For rows
const StyledTableRow = withStyles((theme) => ({
    root: {
        cursor: 'pointer',
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


function ShowMembers({ extractors, managements}) {

    // Invoking Classes
    const classes = useStyle()

    // history
    const history = useHistory()

    // Dispatcher
    const dispatch = useDispatch()

    // State variablef for page
    const [page, setPage] = useState(0);

    // State to store chart type
    const [ tableType, setTableType ] = useState('extractor')

    // Row definition for extractor members
    const extractorRows = extractors.map((member, index) => (
        {
            id: index+1,
            name: member.name,
            email: member.email,
            varified: (member.varified) ? 'Varified': 'Not Varified',
            role: member.role,
        }
    ))

    // Row definition for management members
    const managementRows = managements.map((member, index) => (
        {
            id: index+1,
            name: member.name,
            email: member.email,
            role: member.role,
            varified: (member.varified) ? 'Varified': 'Not Varified'
        }
    ))

    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Number of empty rows
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, extractorRows.length - page * rowsPerPage);

    // Handling page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handling Row per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // option array to display inside select box
    const options = [
        { value: 'extractor', name: 'Extractor' },
        { value: 'management', name: 'Management' }
    ]

    // Function to handle Double click on any row
    function handleCellClick(gridCellParam){

        // Dispatch selected user
        dispatch(selectUser(gridCellParam))

        // Dispatch extracted cases
        if(gridCellParam.role === "extractor"){
            dispatch(fetch_extracted_cases(gridCellParam.email))
        }

        // Dispatch management related stuff
        if(gridCellParam.role === "management"){
            dispatch(extractor_default())
        }

        // Redireect to member deails
        history.push('/list-members/member/'+gridCellParam.id)
    }


    return (
        <Container className={classes.root}>
            <SelectItem value={tableType} setValue={setTableType} options={options} />
            <TableContainer component={Paper} style={{ marginTop: '2em'}} >
                <Table className={classes.table}>
                    <TableHead>
                        <StyledTableRow>
                            {(columns.map((column) => {
                                return (
                                    <StyledTableCell align="left" key={column.field}>{column.headerName}</StyledTableCell>
                                )
                            }))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (tableType === 'extractor') ? (
                                (rowsPerPage > 0
                                    ? extractorRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : extractorRows
                                    ).map((row) => (
                                        <StyledTableRow key={row.name} onDoubleClick={() => handleCellClick(row)}>
                                            <StyledTableCell component="th" scope="row" style={{ width: 100}} align="left">
                                                {row.id}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ width: 200 }} align="left">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ width: 200 }} align="left">
                                                {row.email}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ width: 160 }} align="left">
                                                {row.varified}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ width: 160 }} align="left">
                                                {row.role}
                                            </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                (rowsPerPage > 0
                                    ? managementRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : managementRows
                                ).map((row) => (
                                    <StyledTableRow key={row.name}style={{ cursor: 'pointer'}} onDoubleClick={() => handleCellClick(row)}>
                                        <StyledTableCell component="th" scope="row" style={{ width: 100}} align="left">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 200 }} align="left">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 200 }} align="left">
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 160 }} align="left">
                                            {row.varified}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 160 }} align="left">
                                            {row.role}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))

                                )
                        }

                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </StyledTableRow>
                    )}
                    </TableBody>

                    <TableFooter>
                        <StyledTableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={5}
                                count={(tableType === 'extractor') ? extractorRows.length : managementRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </StyledTableRow>
                    </TableFooter>

                </Table>
            </TableContainer>
        </Container>
    );
}

export default ShowMembers
