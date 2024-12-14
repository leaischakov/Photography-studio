import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { OutlinedInput } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';

import AdminPage from '../admin/AdminPage';
import mainStore from '../../store/mainStore'
import './LogIn.css'

const LogIn = observer(() => {

  //שדות של שמ משתמש וסיסמה
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const funcLogIn = () => {//פונקציה ששולחת לשרת לבדיקת הנתונים של המנהל
    mainStore.saveLogIn(userName, password);
    setUserName("")
    setPassword("")
    console.log(userName);
    console.log(password);
  }
  //השורות הבאות
  //MUI קוד  מ 
  //... בדיקה אם לחצו על האייקון של העין רואים מספרים אחרת רואים סיסמה וכו
  const [values, setValues] = React.useState({//
    password: '',
    weight: '',
    weightRange: '',
    showPassword: true,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value)
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (<>
    {/* הקוד הבא יוצג רק אם המנהל עדיין לא הכנניס את פרטיו נכונה או שהכניס פרטים שגויים */}
    {!mainStore.isLogIn &&
      <>
        <div className="logIn">
          <TextField className='logInTextField' id="outlined-basic" label="User name" variant="outlined" value={userName} onChange={e => setUserName(e.target.value)} />
          <br></br>
          <br></br>
          <OutlinedInput
            // className='logInTextField'
            id="outlined-adornment-password"
            type={!values.showPassword ? 'text' : 'password'}
            value={values.password}
            label="Password"
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment>
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <br></br>
          <br></br>
          <Button variant="contained" disableElevation onClick={funcLogIn} >
            התחבר
          </Button>
        </div>
      </>
    }
    {/* הודעת שגיאה במקרה של הזנת פרטים שגויה */}
    {!mainStore.cliked && <Alert severity="error">You can't enter.</Alert>}

    {/*<AdminPage /> אם  הנתונים שהכניס תואמים אז הוא מועבר לקומפוננטת */}
    {mainStore.degel && <AdminPage />}
  </>);
})
export default LogIn










