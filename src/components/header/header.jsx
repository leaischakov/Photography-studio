import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CallIcon from '@mui/icons-material/Call';


import serviceStore from '../../store/serviceStore';
import mainStore from '../../store/mainStore';
import AddMeeting from '../addMeeting/AddMeeting';
import AddService from '../addService/AddService';
import meetingStore from "../../store/meetingStore";
import './header.css'
import logo from '../../assets/logo.jpg'
const Header = observer(() => {

    //Edit
    //שדות של פרטי בעל העסק
    const [name, setName] = useState(mainStore.businessData.name);

    const [address, setAddress] = useState(mainStore.businessData.address);

    const [phone, setPhone] = useState(mainStore.businessData.phone);

    const [owner, setOwner] = useState(mainStore.businessData.owner);

    const [description, setDescription] = useState(mainStore.businessData.description);

    const saveChangeEdit = async () => {//פונקציה ששולחת לשרת את פרטי בעל העסק המעודכנים
        await mainStore.editDetails(1, name, address, phone, owner, description);
        await mainStore.getBusinessData();
    }
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleClickOpenEdit = () => {//טופס העריכה נפתח
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {//טופס העריכה נסגר
        setOpenEdit(false);
    };

    return (
        <>
            <header>

                <Card className='card'>
                    <div className='header' style={{ position: 'sticky', top: '10px', zIndex: 1 }}>
                        <CardContent >
                            {!mainStore.isLogIn &&//תנאי שיוצג רק למשתמש
                                <Button href='http://localhost:5173/admin' style={{ display: 'flex', marginTop: 0 }} variant="contained" sx={{
                                    borderRadius: '20px', backgroundColor: 'black', '&:hover': {
                                        backgroundColor: '#ff8a65',
                                    },
                                    width: 100, height: 40
                                }}> <AccountCircleIcon sx={{ marginRight: '8px' }}></AccountCircleIcon>התחבר</Button>
                            }
                            <nav key={"navigation"}>
                                <img key={"img"} className='logo' src={logo} alt="logo" />
                                <a key={"name"}>{mainStore.businessData.name}</a>
                                |
                                <a key={"owner"}>{mainStore.businessData.owner}</a>
                                |
                                <a key={"address"}><LocationOnIcon></LocationOnIcon> {mainStore.businessData.address}</a>
                                |
                                <a key={"phone"}>
                                    <CallIcon fontSize='small' style={{ color: "black" }} ></CallIcon>
                                    {mainStore.businessData.phone}
                                    {/* {console.log("mainStore.businessData.phone", mainStore.businessData.phone)} */}
                                </a>
                                |
                                <CollectionsIcon fontSize='small' style={{ color: "black" }}></CollectionsIcon>
                                <Button key={"buttonGallery"} href='http://localhost:5173/gallery'
                                    size="small"
                                    style={{ fontSize: 20, color: 'black' }}
                                >
                                    גלריה
                                </Button>|

                                {!mainStore.isLogIn &&//תנאי שיוצג רק למשתמש
                                    <>
                                        <InsertInvitationIcon fontSize='small' style={{ color: "black" }} ></InsertInvitationIcon>
                                        <Button key={"buttonOrder"}
                                            onClick={() => meetingStore.isClick = !meetingStore.isClick}
                                            size="small"
                                            style={{ fontSize: 20, color: 'black' }}
                                        >
                                            הזמנת צילום
                                        </Button> |
                                    </>
                                }

                                {mainStore.isLogIn &&//תנאי שיוצג רק למנהל
                                    <>
                                        <EditIcon fontSize='small' style={{ color: "black" }} ></EditIcon>
                                        <Button key={"buttonEdit"}
                                            onClick={handleClickOpenEdit}
                                            style={{ fontSize: 20, color: 'black' }}
                                        >
                                            עריכת פרטי העסק
                                        </Button>  |
                                        <AddIcon fontSize='small' style={{ color: "black" }} ></AddIcon>
                                        <Button key={"buttonAdd"}
                                            onClick={() => serviceStore.isClick = !serviceStore.isClick}
                                            style={{ fontSize: 20, color: 'black' }}
                                        >
                                            הוספת שירות
                                        </Button>  |
                                        {/* ניתוב בחזרב ל ADMIN*/}
                                        <a key={"homePage"} href='http://localhost:5173/admin'> <HomeIcon></HomeIcon>לדף הבית </a>

                                    </>
                                }
                            </nav>
                            {/*<AddMeeting></AddMeeting> בעת לחיצה על הזמנת צילום המשנה מתעדכן ואם הוא אמת אז נפת תופס מקומפוננתת */}
                            {meetingStore.isClick && <AddMeeting></AddMeeting>}
                            {/* <AddService></AddService> בעת לחיצה על הוספת שירות המשנה מתעדכן ואם הוא אמת אז נפת תופס מקומפוננתת */}
                            {serviceStore.isClick && <AddService></AddService>}
                        </CardContent>
                    </div>
                </Card>
            </header >
            {/* נפתח הטופס של עריכת פרטים */}
            <React.Fragment>
                <Dialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleCloseEdit();
                        },
                    }}
                >
                    <DialogTitle>עריכת פרטי העסק</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="שם העסק"
                            defaultValue={mainStore.businessData.name}
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setName(e.target.value) }}
                        // onChange={(e) => { mainStore.businessData.name}}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="כתובת"
                            defaultValue={mainStore.businessData.address}
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setAddress(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="טלפון"
                            defaultValue={mainStore.businessData.phone}
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setPhone(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="תאור העסק"
                            defaultValue={mainStore.businessData.description}
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setDescription(e.target.value) }}
                        >
                        </TextField>
                        <br />
                        <TextField
                            variant="outlined"
                            color="secondary"
                            label="שם בעל העסק"
                            defaultValue={mainStore.businessData.owner}
                            style={{ width: 200, margin: 5 }}
                            onChange={(e) => { setOwner(e.target.value) }}
                        >
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>סגירה</Button>
                        {console.log("before", name, address, phone, owner, description)}
                        <Button type="submit" onClick={saveChangeEdit}>שמירה</Button>
                        {/* {console.log(name, address, phone, owner, description)} */}
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
})
export default Header