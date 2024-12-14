
import * as React from 'react';

import { observer } from "mobx-react-lite";


import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";


import meetingStore from "../../store/meetingStore";
import './Meeting.css'

const Meeting = observer(() => {

    const validDate = (dateTime) => {//פונקציה המחשבת מתי זמן הפגישה וצובעת בהתאם את השורה
        const today = new Date();
        const meetingDate = new Date(dateTime);
        const timeDiff = meetingDate.getTime() - today.getTime();
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return 'green'//עבר
        else if (diffDays === 0) return 'red';//היום
        else if (diffDays > 1 && diffDays < 7) return 'orange';//עתיד
    };

    return (
        <>
            <div className="tableDiv">
                <TableContainer component={Paper} sx={{ justifyContent: 'center', maxWidth: 800, maxHeight: 400, overflow: 'auto' }} >
                    <Table sx={{ maxWidth: 800, maxHeight: 400 }} stickyHeader aria-label="sticky table">
                        <TableHead  >
                            <TableRow>
                                <TableCell sx={{ backgroundColor: 'gray' }}>ID</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'gray' }} >Type</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'gray' }}>Date</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'gray' }}>Name</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'gray' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'gray' }}>Email</TableCell>
                            </TableRow>
                        </TableHead>

                        {meetingStore.tempMeetingArr.map((meeting) => (
                            <TableBody >
                                <TableRow key={meeting.id}>
                                    <TableCell component="th" scope="row" sx={{ backgroundColor: validDate(meeting.dateTime) }}>
                                        {meeting.id}
                                        {console.log("meet.id", meeting.id)}
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: validDate(meeting.dateTime) }} align="center">{meeting.serviceType}</TableCell>
                                    <TableCell sx={{ backgroundColor: validDate(meeting.dateTime) }} align="center">{meeting.dateTime}</TableCell>
                                    <TableCell sx={{ backgroundColor: validDate(meeting.dateTime) }} align="center">{meeting.clientName}</TableCell>
                                    <TableCell sx={{ backgroundColor: validDate(meeting.dateTime) }} align="center">{meeting.clientPhone}</TableCell>
                                    <TableCell sx={{ backgroundColor: validDate(meeting.dateTime) }} align="center">{meeting.clientEmail}</TableCell>
                                </TableRow>
                            </TableBody>
                        ))}

                    </Table>
                </TableContainer>
            </div>
        </>
    )
})
export default Meeting
