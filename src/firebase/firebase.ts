// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { auth_Initialize } from "./firebase_auth";
import { data_Initialize } from "./firebase_data";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export let app: FirebaseApp;
export let analytics: Analytics;

export function initializeFirebase() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDesQ685aAp1YJe8a_vhYuBzTvyU1T13js",
        authDomain: "cisc275-ezshop.firebaseapp.com",
        projectId: "cisc275-ezshop",
        storageBucket: "cisc275-ezshop.appspot.com",
        messagingSenderId: "903230047717",
        appId: "1:903230047717:web:9dfe7528140be2d4989b0c",
        measurementId: "G-T7M0R8MHWS"
    };

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);

    auth_Initialize();
    data_Initialize();
}
