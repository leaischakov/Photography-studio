import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import serviceStore from '../../store/serviceStore';
import AddService from '../addService/AddService';
import './Admin.css'

const AdminPage = observer(() => {
    const navigate = useNavigate();
    return (
        <>
            {/* ניתוב לדף שירותים בעת לחיצה על הדיב */}
            <div className="picture-container">
                <div className='bgImageService' onClick={() => navigate('/admin/services')}>
                    <p className='p'> הצגת השירותים</p>
                </div>

                {/* גם פה נפתח הטופס של הוספת שירות בעת לחיצה על הדיב */}
                <div className='bgImageAddService' onClick={() => serviceStore.isClick = !serviceStore.isClick}>
                    <p className='p'> הוספת שירות</p>
                </div>

                {/* ניתוב לדף פגישות בעת לחיצה על הדיב */}
                <div className='bgImageMeeting' onClick={() => navigate('/admin/meeting')}>
                    <p className='p'>הצגת פגישות</p>
                </div>
            </div>

            {/*<AddService></AddService> בעת לחיצה עוברים לקוממפוננטת */}
            {serviceStore.isClick && <AddService></AddService>}
        </>
    )
});
export default AdminPage;