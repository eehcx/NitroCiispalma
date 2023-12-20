import {
  getDatabase,
  ref,
  get,
  push,
  set,
  update,
  orderByChild,
  equalTo,
  child,
  query,
  DatabaseReference,
} from "firebase/database";
import { updateData } from "./services";

const db = getDatabase();

export const setCalculo = async (informeId) => {

  const createCalculo = push(ref(db, `calculos`));

  await set(createCalculo, {
    fecha_creacion: new Date().toISOString()
  })
  const currentCalculo = createCalculo.key;

  const informeRef = ref(db, `informes/${informeId}/informe_resultados`)
  await update(informeRef, {uid_calculo : currentCalculo});

  return 'Cálculo registrado'

}




export const setMuestras = async (calculoId, numLab) => {
  const db = getDatabase();
  const calculoRef = ref(db, "calculos/" + calculoId);

  const muestrasParams = {
    IdLab: numLab,
    fecha_creacion: new Date().toISOString(),
  };

  await get(calculoRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const muestraRef = child(calculoRef, "muestras");

        get(ref(muestraRef))
          .then(async (muestraSnapshot) => {
            if (!muestraSnapshot.exists()) {
              set(muestraRef, [muestrasParams]);
            } else {
              const muestraData = await muestraSnapshot.val();
              muestraData.push(muestrasParams);
              set(ref(muestraRef), muestraData);
            }
          })
          .catch((error) => {
            throw error;
          });
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getMuestras = async (informeId) => {
<<<<<<< HEAD
  
  const informeRef = ref(
    db,
    "informes/" + informeId + "/informe_resultados/0/uid_calculo"
  );
=======
  try {
    const db = getDatabase();
    const informeRef = ref(db, `informes/${informeId}/informe_resultados/0/uid_calculo`);
>>>>>>> 924c425199b3c52d1655737a79456a8bba577900

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


export const updateMuestra = async (muestraId, { ...params }) => {
  updateData(`calculos/muestras/${muestraId}`, { ...params });
};

export const getResultadosMuestra = async (calculoId, numLab) => {
  
  const calculoRef = ref(db, "calculos/" + calculoId);

  get(calculoRef).then((snapshot) => {
    if (snapshot.exists()) {
      const calculosData = snapshot.val();
      const calculosRealizados = [];

      const temp = Object.keys(calculosData).map((e) => ({ ...calculosData }));

      console.log(temp);
    }
  });
};

export const setCalculoResultadosMuestra = async (
  calculoId,
  numLab,
  calculoName,
  { ...resultadosCalculo }
) => {
  //Hace referencia al calculo de un informe, en la ruta del tipo de calculo que se registrará
  
  const resultadosRef = ref(db, `calculos/${calculoId}/${calculoName}`);

  // Guardamos en una variable los resultados, tomando el num de laboratorio de la muestra y un objeto que contiene
  // los datos de los resultados de dicho tipo de resultado
  const resultados = {
    [numLab]: resultadosCalculo,
  };

  //Aquí evalua si tiene que actualizar o registrar los resultados
  await get(resultadosRef).then((snapshot) => {
    if (snapshot.exists()) {
      update(resultadosRef, resultados);
    } else {
      set(resultadosRef, resultados);
      return `Se han registrado los resultados de ${calculoName} en la muestra ${numLab}.`;
    }
  }).catch(error => {
    return error
  });

};

