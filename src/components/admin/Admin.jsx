import * as React from 'react';
import { observer } from 'mobx-react-lite';


import mainStore from '../../store/mainStore'
import LogIn from '../logIn/LogIn';

const Admin = observer(() => {

    return (
        <>
        {/* בתנאי שהמנל אכן עדיין לא נכנס מוצגת לו קומפוננטת לוג אין עם שם משתמש וסיסמה */}
            {!mainStore.isLogin && <LogIn />}
        </>
    )
});
export default Admin;

