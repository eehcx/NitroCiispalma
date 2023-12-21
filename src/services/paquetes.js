import { getDatabase, ref, child, get, push, set } from "firebase/database";
import { updateData } from "./services";

export const getPaquetes = async () => {
  try {
    const db = getDatabase();
    const paquetesRef = child(ref(db), "paquetes");
    const snapshot = await get(paquetesRef);
    if (snapshot.exists()) {
      const paquetesData = snapshot.val();
      const paquetesArray = Object.keys(paquetesData).map((paqueteKey) => ({
        ...paquetesData[paqueteKey],
      }));
      return paquetesArray;
    } else {
      console.log("No hay datos disponibles en la colección 'paquetes'.");
      return [];
    }
  } catch (error) {
    
    throw "Error al obtener la información de los paquetes: ", error;
  }
};

export const setPaquetes = async (nombrePaquete, tipoPaquete, [...elementos]) => {
  const db = getDatabase();

  const nuevoPaqueteRef = push(ref(db, "paquetes"));
  // Obtener el ID generado
  const nuevoPaqueteId = nuevoPaqueteRef.key;

  // Objeto de datos
  const paqueteData = {
    uid: nuevoPaqueteId,
    nombre: nombrePaquete,
    tipo: tipoPaquete,
    fecha_creacion: new Date().toISOString(),
    analisis: elementos
  };
  await set(ref(db, `paquetes/${nuevoPaqueteId}`), paqueteData);
  return `Paquete registrado! Ahora esta disponible el paquete: ${nombrePaquete}`
};

const updatePaquetes = async (idPaquete, {...params}) =>{
    
    updateData(`paquetes/${idPaquete}`, {...params})
}
