import { observer } from "mobx-react-lite";
import { useEffect } from "react";


import serviceStore from "../../store/serviceStore";
import newBorn from '../../assets/newBorn.jpg'
import img from '../../assets/alef1.jpg'
import kalot from '../../assets/kalot8.jpg'
import chalake from '../../assets/chalake.jpg'
import smashaCake from '../../assets/smasheCake.jpg'
import purim from '../../assets/purim.jpg'
import barMitzva from '../../assets/barMitzva1.jpg'
import batMitzva from '../../assets/batMitzva2.jpg'
import alef from '../../assets/alef3.jpg'
import './serviceArr.css'

const ServiceArray = observer(() => {
    //הכנסת השירותים שאנחנו הכנסנו קשה בקוד בפעם הראשונה שהקומפוננטה עולה לאוויר
    useEffect(() => {
        serviceStore.serviceArr.map((ser) => {
            serviceStore.addService(serviceStore.count, ser.name, ser.description, ser.price, ser.duration)
        })
    }, []);

    //פונקציה שמקבלת שם של שירות ומחחזיר ניתוב לתמונה בהתאם לשם השירות
    const getBackgroundImage = (serviceName) => {
        switch (serviceName.toLowerCase()) {
            case 'ניובורן':
                return `url(${newBorn})`;
            case 'חלאקה':
                return `url(${chalake})`;
            case 'גיל שנה':
                return `url(${smashaCake})`;
            case 'פורים':
                return `url(${purim})`;
            case 'כלות':
                return `url(${kalot})`;
            case 'בר מצווה':
                return `url(${barMitzva})`;
            case 'בת מצווה':
                return `url(${batMitzva})`;
            case 'צילומי כיתה אלף':
                return `url(${alef})`;
            default://אם אין תמונה התואמת את שם השירות תוצג תמונת ברירת מחדל
                return `url(${img})`;
        }
    };

    return (
        <>
            {/* הצגת השירותים */}
            {serviceStore.serviceArr.map((service) => <>
                <div className="bgi" style={{ backgroundImage: getBackgroundImage(service.name) }}>
                    <h3 className="titel">{service.name}</h3>
                    <div className="details" >
                        <div className="text">
                            {/* <h3>{service.name}</h3> */}
                            <h4> {service.description}</h4>
                            <h4>משך זמן הצילום: {service.duration}</h4>
                            <h4>מחיר: {service.price}</h4>
                        </div>
                    </div>
                </div>
            </>
            )}
        </>
    )
})
export default ServiceArray