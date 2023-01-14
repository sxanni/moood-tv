// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBFWDhd-fuLwu229VDnPN-Qcq9pMAHVeQ",
  authDomain: "moood-tv.firebaseapp.com",
  projectId: "moood-tv",
  storageBucket: "moood-tv.appspot.com",
  messagingSenderId: "308578430231",
  appId: "1:308578430231:web:bbe5f312dc6468cced1b52",
  measurementId: "G-JJCR0K23QZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);