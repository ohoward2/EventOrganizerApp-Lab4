import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLQf6W1yC84cGuVohhyJSaHB7iClRp4mE",
    authDomain: "booklibrary-lab3.firebaseapp.com",
    projectId: "booklibrary-lab3",
    storageBucket: "booklibrary-lab3.firebasestorage.app",
    messagingSenderId: "599696527823",
    appId: "1:599696527823:web:6e8b392f6da8cdaa4182ba",
};

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing Firebase app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

const firestore = getFirestore(app);

export { auth, firestore };
