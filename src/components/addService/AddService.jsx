import * as React from 'react';
import { useState } from "react";

import { observer } from "mobx-react-lite";

import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import serviceStore from "../../store/serviceStore";

//השדות של הוספת שירות
const AddService = observer(() => {

    const [open, setOpen] = React.useState(true);

    const [serviceType, setServiceType] = useState('');

    const [price, setPrice] = useState('');

    const [during, setDuring] = useState('');

    const [descriptionAdd, setDescription] = useState('');

    const saveChangeAdd = () => {//פונקציה המוסיפה את השירות בשרת
        const id = serviceStore.count + 1//ID עדכון ה 
        serviceStore.addService(id, serviceType, descriptionAdd, price, during)
        serviceStore.count = id;
    }

    const handleClose = () => {//סגירת הטופס
        setOpen(true);
        serviceStore.isClick = !serviceStore.isClick
    };

    return (
        <>
            {/* הטופס של הוספת שירות */}
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>  הוספת שירות</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="סוג השירות"
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setServiceType(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label=" מחיר"
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setPrice(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="תיאור השירות"
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setDescription(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="משך זמן הפגישה "
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setDuring(e.target.value) }}
                        >
                        </TextField>
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>ביטול</Button>
                        <Button type="submit" onClick={saveChangeAdd}>הוספה</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>)
})
export default AddService