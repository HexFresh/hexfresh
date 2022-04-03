import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const publicKey = process.env.REACT_APP_PUBLIC_VAPID

export const getCurrentToken = () => {
    getToken(messaging, { vapidKey: publicKey }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
            return currentToken;
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        })
    })

export const onBackgroundMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        })
    })

