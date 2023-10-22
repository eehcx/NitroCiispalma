import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, initializeAuth, inMemoryPersistence, getReactNativePersistence } from 'firebase/auth';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

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
//const auth = getAuth(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

/*
// Persistencia
setPersistence(auth, inMemoryPersistence) // Puedes usar 'SESSION', 'LOCAL', o 'NONE'
    .then(() => {
        console.log('Persistencia de autenticación configurada con éxito.');
    })
    .catch((error) => {
        console.error('Error al configurar la persistencia de autenticación:', error);
    });
*/

export { app, auth };