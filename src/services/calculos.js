import {
  ref,
  get,
  push,
  set,
  update,
  orderByChild,
  equalTo,
  child,
  query,
  getDatabase
} from 'firebase/database';
import {db, updateData} from './services';

/* Función para crear un registro en la rama de cálculos. Se inserta una referencia del cálculo al informe
al que pertenece el informeId que se le pasa como parámetro*/
export const setCalculo = async informeId => {
  try {
    const createCalculo = push(ref(db, 'calculos'));
    const currentCalculo = createCalculo.key;

    await set(createCalculo, {
      fecha_creacion: new Date().toISOString(),
      uid_calculo: currentCalculo,
    });

    const informeRef = ref(db, `informes/${informeId}`);
    await update(informeRef, {uid_calculo: currentCalculo});

    return 'Cálculo registrado';
  } catch (error) {
    console.error('Error al registrar el cálculo:', error.message);
    throw new Error('Hubo un error al registrar el cálculo');
  }
};

export const setMuestras = async (calculoId, numLab) => {
  const calculoRef = ref(db, `calculos/${calculoId}`);
  const muestrasRef = child(calculoRef, 'muestras');

  const muestrasParams = {
    IdLab: numLab,
    fecha_creacion: new Date().toISOString(),
  };

  try {
    const calculoSnapshot = await get(calculoRef);

    if (calculoSnapshot.exists()) {
      const muestraSnapshot = await get(muestrasRef);

      if (!muestraSnapshot.exists()) {
        set(muestrasRef, [muestrasParams]);
      } else {
        const muestraData = muestraSnapshot.val();
        muestraData.push(muestrasParams);
        set(muestrasRef, muestraData);
      }
    } else {
      throw new Error('El cálculo no fue encontrado');
    }

    return 'La muestra fue agregada correctamente';
  } catch (error) {
    console.error('Error al agregar la muestra: ', error.message);
    throw new Error('Hubo un error al agregar la muestra');
  }
};

export const getMuestras = async (informeId) => {
  try {
    const db = getDatabase();
    const informeRef = ref(db, `informes/${informeId}/informe_resultados/0/uid_calculo`);

    const calculoIdSnapshot = await get(informeRef);
    if (calculoIdSnapshot.exists()) {
      const calculoId = calculoIdSnapshot.val();
      console.log(calculoId);

      const snapshot = await get(ref(db, `calculos/${calculoId}`));
      if (snapshot.exists()) {
        const muestras = snapshot.val().muestras;
        return muestras || [];
      }
    }
    return []; // Si no se encuentran datos de muestras, devuelve un array vacío
  } catch (error) {
    console.error('Error al obtener las muestras:', error);
    throw error;
  }
};

export const updateMuestra = async (muestraId, params) => {
  updateData(`calculos/muestras/${muestraId}`, params);
};

export const getResultadosMuestra = async (calculoId, numLab) => {
  const calculoRef = ref(db, `calculos/${calculoId}`);

  try {
    const calculo = await get(calculoRef);

    if (calculo.exists()) {
      const calculosData = calculo.val();


      
    }
  } catch (error) {
    console.error('Error al obtener las resultados: ', error.message);
    throw new Error('Hubo un error al obtener los resulados de la muestra');
  }
};

export const setCalculoResultadosMuestra = async (
  calculoId,
  numLab,
  calculoName,
  resultadosCalculo,
) => {
  //Hace referencia al calculo de un informe, en la ruta del tipo de calculo que se registrará

  const resultadosRef = ref(db, `calculos/${calculoId}/${calculoName}`);

  // Guardamos en una variable los resultados, tomando el num de laboratorio de la muestra y un objeto que contiene
  // los datos de los resultados de dicho tipo de resultado
  const resultados = {
    [numLab]: resultadosCalculo,
  };

  //Aquí evalua si tiene que actualizar o registrar los resultados
  try {
    const snapshot = await get(resultadosRef);
  
    if (snapshot.exists()) {
      await update(resultadosRef, resultados);
    } else {
      await set(resultadosRef, resultados);
    }
  
    return `Se han registrado los resultados de ${calculoName} en la muestra ${numLab}.`;
  } catch (error) {
    console.error('Error al registrar los resultados:', error.message);
    throw new Error('Hubo un error al registrar los resultados');
  }
};
