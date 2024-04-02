import React, { useState, useEffect } from 'react';
// Firebase
import { app } from '../app/firebase';
import { getDatabase, push, set, ref, query, orderByChild, equalTo, orderByKey, limitToLast, onValue, off, get, onSnapshot } from 'firebase/database';

export const getClients = (callback) => {
    const db = getDatabase(app);
    const clientesRef = ref(db, 'clientes');

    const unsubscribe = onValue(clientesRef, (snapshot) => {
        if (snapshot.exists()) {
            const clientesData = snapshot.val();
            const clientesArray = Object.keys(clientesData).map(clienteKey => ({
            ...clientesData[clienteKey],
                id: clienteKey, 
            }));

            callback(clientesArray);
        } else {
            callback([]);
        }
        }, (error) => {
            console.error('Error al escuchar los cambios en clientes:', error.message);
            throw new Error('Hubo un error al escuchar los cambios en clientes');
        }
    );

    return unsubscribe;
};

export const getInforms = (clientId, callback) => {
    const db = getDatabase(app);
    const informesRef = ref(db, 'informes');

    const informeQuery = query(
        informesRef,
        ...[orderByChild('uid_client'), equalTo(clientId)],
    );

    const unsubscribe = onValue(informeQuery, (snapshot) => {
        if (snapshot.exists()) {
            const informesData = snapshot.val();
            callback(informesData);
        } else {
            callback([]); 
        }
    }, (error) => {
        console.error('Error al escuchar los cambios en los informes del cliente:', error.message);
        throw new Error('Hubo un error al escuchar los cambios en los informes del cliente');
    });

    return unsubscribe;
};

export const getIdcalculus = async (informeId) => {
    try {
        const db = getDatabase(app);
        const informeRef = ref(db, `informes/${informeId}/informe_resultados/0/uid_calculo`);

        const calculoIdSnapshot = await get(informeRef);
        if (calculoIdSnapshot.exists()) {
            const calculoId = calculoIdSnapshot.val();
            return calculoId;
        }
        return null; // Si no se encuentra el uid del cálculo, devuelve null
    } catch (error) {
        console.error('Error al obtener el uid del cálculo:', error);
        throw error;
    }
};

// Consultar ultimos calculos realizados y obtener el uid de cada uno

export const getCalculus = (onUpdate) => {
    const db = getDatabase(app);
    const calculosRef = ref(db, 'calculos');

    const handleDataChange = (snapshot) => {
        if (snapshot.exists()) {
            const calculos = Object.keys(snapshot.val()).reverse().slice(0, 3);
            onUpdate(calculos);
        } else {
            onUpdate([]);
        }
    };

    const unsubscribe = onValue(calculosRef, handleDataChange);

    return () => {
        off(calculosRef, 'value', handleDataChange);
    };
};

export const getCountOfSubcollections = (parentCollection, onUpdate) => {
    const db = getDatabase(app);
    const parentRef = ref(db, parentCollection);

    const handleDataChange = (snapshot) => {
        if (snapshot.exists()) {
        const subcollectionsCount = Object.keys(snapshot.val()).length;
        onUpdate(subcollectionsCount);
        } else {
        onUpdate(0);
        }
    };

    const unsubscribe = onValue(parentRef, handleDataChange);

    return () => {
        off(parentRef, 'value', handleDataChange);
    };
};

export const getCurve = async (uid, element) => {
    const db = getDatabase(app);
    const curveRef = ref(db, `calculos/${uid}/curva_calibracion/${element}`);

    try {
        const snapshot = await get(curveRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error al obtener datos de ${element}:`, error);
        return null;
    }
};

export const getLastSample = async () => {
    const db = getDatabase(app);
    const calcRef = ref(db, 'calculos');

    try {
        const snapshot = await get(calcRef);
        const muestrasArray = [];

        if (snapshot.exists()) {
            // Iterar sobre los registros
            snapshot.forEach(childSnapshot => {
                const muestras = childSnapshot.val().muestras;
                if (muestras) {
                    muestrasArray.push(muestras);
                }
            });
            return muestrasArray;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
};