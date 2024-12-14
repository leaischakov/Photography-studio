import { action, makeObservable, observable, runInAction } from "mobx";
//import { observable, makeObservable, action, runInAction } from 'mobx';
//  import img1 from '../assets/image/img1.jpg'
//  import newBorn1 from '../assets/image/newBorn1.jpg'
// import newBorn2 from '../assets/image/newBorn2.jpg'

//  import chalake from '../../assets/threeAge.jpg/'
import chalake from '../assets/chalake.jpg/'
import newBorn from '../assets/newBorn.jpg/'
import smashaCake from '../assets/smasheCake.jpg'
import purim from '../assets/purim.jpg'
import kalot from '../assets/kalot2.jpg'
import betMitzva from '../assets/batMitzva7.jpg'
// import smashCake from '../assets/smashCake.webp/'


class ServiceStore {
    // id: "",
    //     name: "",
    //     description: " ",
    //     price: '',
    //     duration: '',
    isClick = false;
    count = 5;
    // picArr = [newBorn, newBorn, smashaCake, chalake, purim, kalot, betMitzva];
    serviceArr = [
        {
            id: "1",
            // name: newBorn,
            name: "ניובורן",
            description: "רוצה להנציח רגעים שלא יחזרו? צילומי ניו בורן במחירים שווים",
            price: '800',
            duration: '90',
            img: newBorn,

        },
        {
            id: "2",
            //name:smashaCake,
            name: "גיל שנה",
            description: "רוצה להנציח רגעים שלא יחזרו? צילומי גיל שנה במחירים שווים",
            price: '200',
            duration: '60',
            img: smashaCake,

        },
        {
            id: "3",
            //name: chalake,
            name: "חלאקה",
            description: "רוצה להנציח רגעים שלא יחזרו? צילומי חלאקה במחירים שווים",
            price: '100',
            duration: '20',
            img: chalake,

        },
        {
            id: "4",
            // name: purim,
            name: "פורים",
            description: "רוצה להנציח רגעים שלא יחזרו? צילומי צילומי פורים במחירים שווים",
            price: '150',
            duration: '30',
            img: purim,
        },
    ];//Add thid services to server


    postService = false;
    constructor() {

        makeObservable(this, {

            serviceArr: observable,
            postService: observable,
            // picArr: observable,
            isClick: observable,
            count: observable,
            getServices: action,
            addService: action,
            // initData: action

        })

        // this.getServices()
    }


    async addService(id, name, description, price, duration) {
        const services = await this.getServices();

        //אנחנו עוברים במאפ אז זה קורה כמה פעמים ומכניס לשרת על ידי קריאה לפונקציה זו  <ServiceArray>  בגלל שביוזאפקט  שעשינו ב
        //אז יש פה תנאי שרק  אם  השם של השירות שאנו רוצים להוסיף עוד לא נמצא בשרת אז השורות קוד הבאות יקרו
        console.log("PostService: ");
        if (!services?.find((service) => service.name === name)) {
            const res = await fetch("http://localhost:8787/service", {
                method: "POST",
                body: JSON.stringify({ id, name, description, price, duration }),
                headers: { "Content-Type": "application/json", }
            });
            if (res.status === 200) {
                this.postService = true;
                console.log("cnt", this.count);
                console.log("PostServiceStaus: ", res.status);
                this.getServices();
            }
            console.log("PostServiceStaus: ", res.status);

        }//הודעת שגיאה


    }


    async getServices() {
        const services = await fetch("http://localhost:8787/services")
        const data = await services.json();
        this.serviceArr = data;
        return data;
    }
}
export default new ServiceStore