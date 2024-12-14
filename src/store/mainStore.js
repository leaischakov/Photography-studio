import { Description } from '@mui/icons-material';
import { observable, makeObservable, action, runInAction } from 'mobx';


class MainStore {

    isLogIn = false;
    f;
    degel = false;
    cliked = true;
    oneTimeEdit = false;

    businessData = {
        name: "camera",
        address: "dimona",
        phone: "0504161548",
        owner: "shilat & lea",
        description: "רוצים להנציח רגעים מושלמים?",
    }

    constructor() {
        makeObservable(this, {
            oneTimeEdit: observable,
            isLogIn: observable,
            f: observable,
            businessData: observable,
            degel: observable,
            saveLogIn: action,
            getBusinessData: action,
            editDetails: action,
            cliked: observable
        })
        this.getBusinessData();
    }
    
    saveLogIn = async (name, password) => {
        const res = await fetch("http://localhost:8787/login", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json", },
        });
        this.oneTimeEdit = true;
        if (res.status === 200) {
            this.isLogIn = true;
            this.degel = true;
            this.f = true;
            this.cliked = true;
        }
        else { this.cliked = false; }
    }

    editDetails = async (id, name, address, phone, owner, description) => {
        const res = await fetch("http://localhost:8787/businessData", {
            method: "PUT",
            body: JSON.stringify({ id, name, address, phone, owner, description }),
            headers: { "Content-Type": "application/json", },
        });
        this.getBusinessData();
    }

    async getBusinessData() {
        const businessData = await fetch("http://localhost:8787/businessData")
        const data = await businessData.json();
        this.businessData = { ...data };

    }
}
const m = new MainStore()

export default m;