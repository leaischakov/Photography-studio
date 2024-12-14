import { observable, makeObservable, action } from "mobx";

class MeetingStore {
    tempMeetingArr = [];
    meetingRes = false;
    count = 0;
    isClick = false;
    today = false;

    constructor() {
        makeObservable(this, {
            tempMeetingArr: observable,
            meetingRes: observable,
            count: observable,
            isClick: observable,
            today: observable,
            getMeetings: action,
            saveMeeting: action,

        })
        this.getMeetings();
    }

    handleClick() {
        this.isClick = !this.isClick
    }
    async saveMeeting(id, serviceType, dateTime, clientName, clientPhone, clientEmail) {
        const response = await fetch("http://localhost:8787/appointment", {
            method: "POST",
            body: JSON.stringify({ id, serviceType, dateTime, clientName, clientPhone, clientEmail }),
            headers: {
                "Content-Type": "application/json",
            },
        })


        if (response.status === 200) { this.meetingRes = true; this.getMeetings(); }// עולה ב 1 CNT ה
        console.log("cntMeet", this.count);
    }

    async getMeetings() {

        const meetings = await fetch("http://localhost:8787/appointments");
        var data = await meetings.json();

        //מיון הפגישות שקודם כל יוצגו הפגישות של היום אחכ את הפגישות שהיו ואחכ את הפגישות שיהיו
        const currentDate = new Date();
        const sortedMeetings = data.slice().sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        const presentMeetings = [];
        const pastMeetings = [];
        const futureMeetings = [];

        sortedMeetings.forEach(meeting => {
            const meetingDate = new Date(meeting.dateTime);

            if (meetingDate.toDateString() === currentDate.toDateString()) {
                presentMeetings.push(meeting);
            } else if (meetingDate < currentDate) {
                pastMeetings.push(meeting);
            } else {
                futureMeetings.push(meeting);
            }
        });

        //הכנסה למערך הפגישות קודם כל את היום אחכ את העבר ואחכ את העתיד
        this.tempMeetingArr = [...presentMeetings, ...pastMeetings, ...futureMeetings];
    }






}




export default new MeetingStore