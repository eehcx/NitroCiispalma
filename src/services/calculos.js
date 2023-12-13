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
  const db = getDatabase();
  const informeRef = ref(
    db,
    "informes/" + informeId + "/informe_resultados/0/uid_calculo"
  );

  get(informeRef)
    .then((calculoIdSnapshot) => {
      if (calculoIdSnapshot.exists()) {
        const calculoId = calculoIdSnapshot.val();

        return get(ref(db, "calculos/" + calculoId))
          .then((snapshot) => {
            if (snapshot.exists()) {
              return snapshot.val().muestras;
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

export const updateMuestra = async (muestraId, { ...params }) => {
  updateData(`calculos/muestras/${muestraId}`, { ...params });
};

export const getResultadosMuestra = async (calculoId, numLab) => {
    const db = getDatabase();
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

export const addResultadosMuestra = async (
  calculoId,
  numLab,
  calculoName,
  { ...resultadosCalculo }
) => {
  //Hace referencia al calculo de un informe, en la ruta del tipo de calculo que se registrará
  const db = getDatabase();
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

export const setResultadosMuestra = (
  calculoId,
  numLab,
  {...modeloDatos}
) => {


  addResultadosMuestra(calculoId,
    numLab, )

 Object.keys(modeloDatos).map(key => {
    const value = modeloDatos[key]
    console.log(key, '=>', value)
 })
};


