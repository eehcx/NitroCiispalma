import React, { useState, useEffect } from 'react';
// Firebase
import { app } from '../firebase';
import { getDatabase, push, set, ref, orderByKey, limitToLast, onValue, off, get } from 'firebase/database';

// Consultar ultimos calculos realizados y obtener el uid de cada uno

export const getCalculus = (onUpdate) => {
    const db = getDatabase();
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
    const db = getDatabase();
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