import { v4 as uuidv4 } from 'uuid';


export const userAuth = () => {
    // すでにuuidが発行されているか確認
    const storedID = localStorage.getItem('uniqueID');
    console.log("store: " + storedID);

    if (storedID === null) {
        const uniqueID = uuidv4();
        localStorage.setItem('uniqueID', uniqueID);
        console.log(uniqueID);
    }
}
