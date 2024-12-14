import { observer } from "mobx-react-lite";


import ServiceArray from "../servicesArray/ServicesArray";

const User = observer(() => {

    return (
        <>
            {/* <ServiceArray></ServiceArray> קריאה לקומפוננטת  */}
            <ServiceArray></ServiceArray>
        </>
    )
})
export default User