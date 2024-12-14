import { observer } from "mobx-react-lite";
import { useState } from "react";
import * as React from 'react';


import Select from '@mui/material/Select';
import { Button, MenuItem, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



import meetingStore from '../../store/meetingStore'
import serviceStore from "../../store/serviceStore";

const AddMeeting = observer(() => {

    //השדות של הטופס של הזמנת צילום
    const [serviceType, setServiceType] = useState(serviceStore.serviceArr);

    const [timeAndValue, setTimeAndValue] = useState('');

    const [emeil, setEmeil] = useState('');

    const [name, setName] = useState('');

    const [phone, setPhone] = useState('');

    const handleChange = (event) => {
        setServiceType(event.target.value)
    }

    const saveMeeting = () => {//פונקציה המוסיפה פגישה לשרת
        const id = meetingStore.count + 1;//ID עדכון ה 
        meetingStore.saveMeeting(id, serviceType, timeAndValue, name, phone, emeil);
        meetingStore.count = id;
        console.log("meetCntJSX", meetingStore.count);
    }

    const [open, setOpen] = React.useState(true);



    const handleClose = () => {//סגירת הטופס
        setOpen(false);
        meetingStore.isClick = !meetingStore.isClick
    };

    return (
        <>
            {/* הטופב של הוספת פגישה */}
            <React.Fragment >
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        style: { width: 500 },
                        onSubmit: (event) => {
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>הזמנת צילום</DialogTitle>
                    <DialogContent>
                        {/* הצגת רשימת השירותים לבחירה */}
                        <Select
                            labelId="demo-simple-select-label"//check 
                            id="demo-simple-select"
                            value={serviceType}
                            style={{ width: 400, margin: 10 }}
                            onChange={handleChange}
                        >
                            {serviceStore.serviceArr?.map((_, index) => (
                                <MenuItem key={index}
                                    value={serviceStore.serviceArr[index].name}
                                >
                                    {serviceStore.serviceArr[index].name}
                                </MenuItem>
                            ))}

                        </Select>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            type="datetime-local"
                            //value={time}
                            style={{ width: 400, margin: 10 }}
                            //onChange={(e) => handleDuringChange(e)}
                            onChange={(e) => { setTimeAndValue(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            type="email"
                            //value={emeil}
                            label="email"
                            placeholder="user@gmail.com"
                            style={{ width: 400, margin: 10 }}
                            onChange={(e) => { setEmeil(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="name"
                            placeholder="שם פרטי"
                            //value={name}
                            style={{ width: 400, margin: 10 }}
                            onChange={(e) => { setName(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="טלפון"
                            placeholder="055678944"
                            //value={phone}
                            style={{ width: 400, margin: 10 }}
                            // onChange={(e) => { handlePhoneChange(e.target.value) }}
                            onBlur={(e) => setPhone(e.target.value)}
                        >
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={saveMeeting}>Add</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )

})
export default AddMeeting