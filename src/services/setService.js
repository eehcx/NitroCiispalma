import React, { useState, useEffect } from 'react';
// Firebase
import { app } from '../app/firebase';
import { getDatabase, push, set, ref, onValue, off } from 'firebase/database';

// Guardar Informes

export const saveInformeResultados = async (uid, muestras) => {
    const db = getDatabase(app);
    const informeResultadosRef = ref(db, `informes/${uid}/informe_resultados`);

    const newCalculoRef = push(ref(db, 'calculos'));
    const newCalculoId = newCalculoRef.key;

    const informeResultadoData = {
        uid_calculo: newCalculoId
    };

    await set(newCalculoRef, {
        muestras,
        fecha_creacion: new Date().toISOString()
    });

    await set(informeResultadosRef, [informeResultadoData]);
};

export const saveInform = async (uid_client, uid_package, fecha_recepcion, fecha_entrega, no_muestras, procedencia, tipo_cultivo, no_solicitud, observaciones, muestras ) => {
    const db = getDatabase(app);
    const newInformRef = push(ref(db, `informes`));
    const newInformId = newInformRef.key;

    const informData = {
        uid: newInformId,
        uid_client: uid_client,
        uid_package: uid_package,
        fecha_recepcion: fecha_recepcion,
        fecha_entrega: fecha_entrega,
        no_muestra: no_muestras,
        procedencia: procedencia,
        tipo_cultivo: tipo_cultivo,
        no_solicitud: no_solicitud,
        observaciones: observaciones,
    }

    await set(ref(db, `informes/${newInformId}`), informData);
    await saveInformeResultados(newInformId, muestras);
}

// Crear clientes

export const saveClient = async (nombre, telefono) => {
    try {
        // Obtener la referencia a la base de datos
        const database = getDatabase(app);
        // Crear un nuevo nodo (cliente) con push()
        const nuevoClienteRef = push(ref(database, 'clientes'));
        // Obtener el ID generado
        const newClientId = nuevoClienteRef.key;
        // Objeto de datos
        const newClientData = {
            uid: newClientId,
            nombre: nombre,
            telefono: telefono,
            fecha_creacion: new Date().toISOString(),
        };
        // Guardando el cliente
        await set(ref(database, `clientes/${newClientId}`), newClientData);
        console.log('Client Saved!' + newClientId);
    } catch (error) {
    console.error('Error al guardar el cliente:', error);
    }
};

export const saveCalibrationCurve = async (calculoId, name, listado, pendiente, interseccion_eje_y, r2) => {
    try {
        const db = getDatabase(app);
        const curveRef = ref(db, `calculos/${calculoId}/curva_calibracion/${name}`);

        const newData = {
            listado,
            pendiente,
            interseccion_eje_y,
            r2
        };

        await set(curveRef, newData);
        console.log('Curva creada exitosamente');
    } catch (error) {
        console.error('Error al crear la curva:', error);
        throw error;
    }
};
