import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import getAllUserEvents from '../../requests/get/getAllUserEvents';


export default function EventsTable() {

    const [events, setEvents] = useState(null);

    useEffect(() => {
        getAllUserEvents().then(events => {
            setEvents(events);
        });
    }, []);

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Start time</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Host</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events?.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.title}
                        </TableCell>
                        <TableCell align="right">{row.start_time}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.host}</TableCell>
                        <TableCell align="right">
                            <Button variant="text">Edit</Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}