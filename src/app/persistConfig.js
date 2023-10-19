// persistConfig.js
import { persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

export default persistConfig = {
    key: 'root', // Cambia esto según tus necesidades
    storage: storage, // Utiliza AsyncStorage como motor de almacenamiento
    whitelist: ['user'], // Lista de slices que deseas persistir, en este caso, solo 'user'
};
