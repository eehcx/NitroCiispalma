import React, { useState, useEffect } from 'react';
// Firebase
import { app } from '../app/firebase';
import { getDatabase, push, set, ref, onValue, off } from 'firebase/database';

// Guardar Informes

export const savePackage = async (id, newInformId, nombrePaquete, analisis) => {
    const db = getDatabase(app);
    const paquetesRef = ref(db, `clientes/${id}/informes/${newInformId}/paquetes`);

    const paqueteData = {
        nombre: nombrePaquete,
        analisis: analisis,
    };
    await set(paquetesRef, paqueteData);
}

export const saveInformeResultados = async (id, newInformId, idlab) => {
    const db = getDatabase(app);
    const informeResultadosRef = ref(db, `clientes/${id}/informes/${newInformId}/informe_resultados`);

    const newCalculoRef = push(ref(db, 'calculos'));
    const newCalculoId = newCalculoRef.key;

    const informeResultadoData = {
        idlab: idlab,
        uid: newCalculoId
    };

    await set(newCalculoRef, {
        fecha_creacion: new Date().toISOString()
    });

    await set(informeResultadosRef, [informeResultadoData]);
};

export const saveInform = async (id, fecha_recepcion, fecha_entrega, no_muestras, procedencia, tipo_cultivo, no_solicitud, metodo_usado, observaciones, nombrePaquete, analisis, tipo_analisis) => {
    const db = getDatabase(app);
    const newInformRef = push(ref(db, `clientes/${id}/informes`));
    const newInformId = newInformRef.key;

    const informData = {
        uid: newInformId,
        fecha_recepcion: fecha_recepcion,
        fecha_entrega: fecha_entrega,
        no_muestra: no_muestras,
        procedencia: procedencia,
        tipo_cultivo: tipo_cultivo,
        no_solicitud: no_solicitud,
        metodo_usado: metodo_usado,
        observaciones: observaciones,
        tipo_analisis: tipo_analisis,
    }

    await set(ref(db, `clientes/${id}/informes/${newInformId}`), informData);

    await savePackage(id, newInformId, nombrePaquete, analisis);
    await saveInformeResultados(id, newInformId, '');
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

export const saveCE = async (IdCalc, IdLab, us_cm, dms) =>{
    const database = getDatabase(app);
    const newCERef = push(ref(database, 'calculos/' + IdCalc + '/CE'));

    const newCEId = newCERef.key;
    const newCEData = {
        uid: newCEId,
        IdLab: IdLab,
        us_cm: us_cm,
        dms: dms
    };
    await set(ref(database, `calculos/${IdCalc}/CE/${newCEId}`),newCEData);
    console.log('CE Saved!' + newCEId);
};

export const saveMO = async (IdCalc, IdLab, mL_FeSO4, porcentaje) =>{
    const database = getDatabase(app);
    const newMORef = push(ref(database, 'calculos/' + IdCalc + '/MO'));

    const newMOId = newMORef.key;
    const newMOData = {
        uid: newMOId,
        IdLab: IdLab,
        mL_FeSO4: mL_FeSO4,
        porcentaje: porcentaje
    };
    await set(ref(database, `calculos/${IdCalc}/MO/${newMOId}`),newMOData);
    console.log('MO Saved!' + newMOId);
};

// Funciones de H-Al 
export const saveHAl = async (IdCalc, IdLab, N_HCl, N_NaOH, cmol, ml_HCl, ml_NaOH, promedio) =>{
    const db = getDatabase(app)
    const newHAlRef = push(ref(db, 'calculos/' + IdCalc + '/H-Al'));

    const newHAlId = newHAlRef.key;
    const newHAlData = {
        uid: newHAlId,
        IdLab: IdLab,
        N_HCl: N_HCl,
        N_NaOH
    }

    const newHClData ={
        cmol: cmol,
        ml_HCl: ml_HCl,
        promedio: promedio
    }

    const newNaOHData = {
        cmol: cmol,
        ml,ml_NaOH,
        promedio: promedio
    }
    await set(ref((db, `calculos/${IdCalc}/H-Al/${newHAlId}`)), newHAlData);
};

// Micros

export const saveRegistersMicros = async (calculoId, registrosActualizados, elementos) => {
    const db = getDatabase(app);
    const microsRef = ref(db, `calculos/${calculoId}/Micros`);
    const nuevoMicrosRef = push(microsRef);
    const microsUid = nuevoMicrosRef.key;

    for (const elemento of elementos) {
        for (const registro of registrosActualizados) {
            if (registro.elemento === elemento) {
                const sampleId = registro.sampleId;
                const registrosRef = ref(db, `calculos/${calculoId}/Micros/${microsUid}/${elemento}/${sampleId}`);
                await set(registrosRef, registro);
            }
        }
    }

    console.log('Registros de Micros guardados exitosamente.');
};

export const saveCalibrationCurve = async (calculoId, name, listado, pendiente) => {
    try {
        const db = getDatabase(app);
        const curveRef = ref(db, `calculos/${calculoId}/curva_calibracion/${name}`);

        const newData = {
            listado,
            pendiente,
        };

        await set(curveRef, newData);
        console.log('Curva creada exitosamente');
    } catch (error) {
        console.error('Error al crear la curva:', error);
        throw error;
    }
};