import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyAPdfLScvpqllSdvglAj1qWWseRQd69A-Q",
    authDomain: "nitrociispalma.firebaseapp.com",
    databaseURL: "https://nitrociispalma-default-rtdb.firebaseio.com",
    projectId: "nitrociispalma",
    storageBucket: "nitrociispalma.appspot.com",
    messagingSenderId: "346776110503",
    appId: "1:346776110503:web:9633b2125b836d4f726282",
    measurementId: "G-GNPQHR2YE1"
};

const app = initializeApp(firebaseConfig);

export default app;