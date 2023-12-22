import {getDatabase, ref, child, get, push, set} from 'firebase/database';
import {updateData, db} from './services';

export const getPaquetes = async () => {
  try {
    const paquetesRef = child(ref(db), 'paquetes');
    const snapshot = await get(paquetesRef);
    if (snapshot.exists()) {
      const paquetesData = snapshot.val();
      const paquetesArray = Object.keys(paquetesData).map(paqueteKey => ({
        ...paquetesData[paqueteKey],
      }));
      return paquetesArray;
    } else {
      console.log("No hay datos disponibles en la colección 'paquetes'.");
      return [];
    }
  } catch (error) {
    throw ('Error al obtener la información de los paquetes: ', error);
  }
};

export const setPaquetes = async (
  nombrePaquete,
  tipoPaquete,
  [...elementos],
) => {
  const db = getDatabase();

  const nuevoPaqueteRef = push(ref(db, 'paquetes'));
  // Obtener el ID generado
  const nuevoPaqueteId = nuevoPaqueteRef.key;

  // Objeto de datos
  const paqueteData = {
    uid: nuevoPaqueteId,
    nombre: nombrePaquete,
    tipo: tipoPaquete,
    fecha_creacion: new Date().toISOString(),
    analisis: elementos,
  };
  await set(ref(db, `paquetes/${nuevoPaqueteId}`), paqueteData);
  return `Paquete registrado! Ahora esta disponible el paquete: ${nombrePaquete}`;
};

const updatePaquetes = async (idPaquete, params) => {
  updateData(`paquetes/${idPaquete}`, params);
};

export const getPaquetesPerInforme = async informeId => {
  try {
    const informeRef = ref(db, `informes/${informeId}`);
    const informe = await get(informeRef);

    if (!informe.exists()) {
      throw new Error('Informe no encontrado');
    }

    const paqueteInforme = informe.val().uid_package;

    const paqueteRef = ref(db, `paquetes/${paqueteInforme}`);
    const paquete = await get(paqueteRef);

    if (!paquete.exists()) {
      throw new Error('Paquete no encontrado');
    }

    const paqueteAnalisis = paquete.val().analisis;
    
    return paqueteAnalisis;
  } catch (error) {
    // Manejo de errores aquí
    console.error('Error:', error.message);
    throw error; // Puedes volver a lanzar el error si es necesario
  }
};
