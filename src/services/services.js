import { getDatabase, ref, get, push, set, update, orderByChild, equalTo, child, query } from 'firebase/database';
//import { app } from '../app/firebase';

export const updateData = async (mainRoute, {...params}) =>{
    const db = getDatabase();
    const refMain = ref(db, mainRoute);

    try {
        update(refMain, {...params})
    } catch (error) {
        throw error
    }
}

export const setData = async (mainRoute, {...params}) =>{
    const db = getDatabase();
    const refMain = ref(db, mainRoute);

    try {
        set(refMain, {...params})
    } catch (error) {
        throw error
    }
}

export const pushData = async (mainRoute, {...params}) =>{
    const db = getDatabase();
    const refMain = ref(db, mainRoute);

    try {
        push(refMain, {...params})
    } catch (error) {
        throw error
    }
}