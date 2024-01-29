import React, { useState, useEffect } from 'react';
// Firebase
import { app } from '../app/firebase';
import { getDatabase, push, set, ref, orderByKey, limitToLast, onValue, off, get } from 'firebase/database';

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

export const getCurve = async (uid, type, onDataReceived) => {
    const db = getDatabase(app);
    const curveRef = ref(db, `calculos/${uid}/curva_calibracion/${type}`);

    const unsubscribe = onValue(curveRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            onDataReceived(data);
        } else {
            onDataReceived([]);
        }
    });

    return unsubscribe;
};