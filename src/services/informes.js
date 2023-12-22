import {
  getDatabase,
  ref,
  get,
  push,
  set,
  orderByChild,
  equalTo,
  update,
  query,
} from 'firebase/database';
import {updateData} from './services';
import {app} from '../app/firebase';
import { getPaquetesPerInforme } from './paquetes';
const db = getDatabase(app);

//Funcion para traer todos los informes de un cliente especifico
export const getInformesCliente = async clientId => {
  const informesRef = ref(db, 'informes');

  //Este es una consulta para filtrar los informes que tengan el uid del cliente
  const informeQuery = query(
    informesRef,
    ...[orderByChild('uid_client'), equalTo(clientId)],
  );

  const informesCliente = await get(informeQuery)
    .then(informe => {
      if (informe.exists()) {
        const informesData = informe.val();

        return informesData;
      }

      return [];
    })
    .catch(err => {
      throw ('Hubo un error al obtener los informes del cliente: ', err);
    });

  return informesCliente;
};

// Trae los datos de un informe seleccionado
export const getInforme = async informeId => {
  const informeRef = ref(db, 'informes/' + informeId);

  try {
    const snapshot = await get(informeRef);
  
    if (snapshot.exists()) {
      const informe = snapshot.val();
      const resultados = Object.values(informe.informe_resultados);
  
      // Imprime los resultados del informe y los datos del informe
      const informeData = [informe, resultados];
      return informeData;
    } else {
      console.log('No existe ese informe en la base de datos...');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener el informe:', error.message);
    throw new Error('Hubo un error al obtener el informe');
  }
};

//Funcion para crear un informe, recibe los parametros de necesarios para crear un informe
export const setInforme = async ({
  uid_cliente,
  no_solicitud,
  fecha_entrega,
  fecha_recepcion,
  uid_package,
  no_muestras,
  observaciones,
  procedencia,
  tipo_cultivo,
}) => {
  const createInforme = await push(ref(db, 'informes'));
  const currentInformeId = createInforme.key;

  const informeParams = {
    uid: uid_cliente,
    no_solicitud: no_solicitud,
    fecha_entrega: fecha_entrega,
    fecha_recepcion: fecha_recepcion,
    uid_package: uid_package,
    no_muestras: no_muestras,
    observaciones: observaciones,
    procedencia: procedencia,
    tipo_cultivo: tipo_cultivo,
  };

  await set(ref(db, `informes/${currentInformeId}`), informeParams);

  return console.log('Informe registrado exitosamente!');
};

//Actualizar un informe pasandole un objeto como parametro
export const updateInforme = async (informeId, params) => {
  updateData(`informes/${informeId}`, params);
};

export const setInformeResultados = async (informeId, arrayResultados) => {
  
  try {
    const paqueteAnalisis = await getPaquetesPerInforme(informeId);

    const resultadosMuestra = arrayResultados.map(muestra => {
      const elementosPaquete = {};

      paqueteAnalisis.forEach(elemento => {
        const resultadoValue = muestra.resultados[elemento];
        elementosPaquete[elemento] = resultadoValue;
      });

      const informeResultados = {
        idLab: muestra.idLab,
        resultados: elementosPaquete,
      };

      return informeResultados;
    });

     await update(
      ref(db, `informes/${informeId}`),
      {informe_resultados: resultadosMuestra},
    ); 

    return 'Los datos fueron agregados';
  } catch (error) {
    console.error('Error al procesar los datos:', error.message);
    throw new Error('Hubo un error al procesar los datos del informe');
  }
};

