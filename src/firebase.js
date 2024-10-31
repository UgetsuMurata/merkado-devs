import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDuXgUo9YU33YvVoGo9e1jNC6_jogjDP7c",
    authDomain: "merkado-devs.firebaseapp.com",
    databaseURL: "https://merkado-devs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "merkado-devs",
    storageBucket: "merkado-devs.appspot.com",
    messagingSenderId: "1064865953109",
    appId: "1:1064865953109:web:d5f3e283bc336b088fabdc",
    measurementId: "G-BVLMPP5F83"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const getErrorData = (callback) => {
    const dbRef = ref(database, "unexpectedErrors/errors");
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            callback(data);
        } else {
            console.log("No data available");
        }
    }, (error) => {
        console.error("Error reading data:", error);
    });
};

const resolveError = (index, value) => {
    const dbRef = ref(database, "unexpectedErrors/errors/" + index + "/resolved");
    return set(dbRef, value)
        .then(() => {
            console.log("Data saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving data:", error);
        });
}

const setUpdatesData = (data) => {
    const dbRef = ref(database, "updates/");
    return set(dbRef, data)
        .then(() => {
            console.log("Data saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving data:", error);
        });
};

const getUpdatesData = (callback) => {
    const dbRef = ref(database, "updates");
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            callback(data);
        } else {
            console.log("No data available");
        }
    }, (error) => {
        console.error("Error reading data:", error);
    });
};

export { getErrorData, getUpdatesData, setUpdatesData, resolveError };