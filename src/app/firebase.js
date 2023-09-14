import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDzmWkV3iCeK4_Mg8m-Mtrx7W3zOS6mCJ0",
    authDomain: "ciispalmaapp.firebaseapp.com",
    databaseURL: "https://ciispalmaapp-default-rtdb.firebaseio.com",
    projectId: "ciispalmaapp",
    storageBucket: "ciispalmaapp.appspot.com",
    messagingSenderId: "351676747017",
    appId: "1:351676747017:web:4e4c24cbd2d37bf5f357d8",
    measurementId: "G-55Z39KEJ82"
};

const app = initializeApp(firebaseConfig);

export default app;