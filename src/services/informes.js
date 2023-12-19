import { getDatabase, ref, get, push, set, orderByChild, equalTo, child, query, where } from 'firebase/database';
import { updateData } from './services';
import { app } from '../app/firebase';

//Funcion para traer todos los informes de un cliente especifico
export const getInformesCliente = async (clientId) => {
    try {
        const db = getDatabase(app);
        const informesRef = ref(db, 'informes');

        const informesSnapshot = await get(informesRef);
        const informes = [];

        if (informesSnapshot.exists()) {
            informesSnapshot.forEach((childSnapshot) => {
                const informe = childSnapshot.val();
                if (informe && informe.uid_client === clientId) {
                    informes.push(informe);
                }
            });
        }

        //console.log('Informes obtenidos de Firebase:', informes);
        return informes;
    } catch (error) {
        console.error('Error al obtener informes del cliente:', error);
        return []; // Devuelve un array vacío en caso de error
    }
};

// Trae los datos de un informe seleccionado
export const getInforme = async(informeId) => {
    const db = getDatabase();
    const informeRef = ref(db, 'informes/' + informeId)
    
    return get(informeRef)
    .then((async snapshot =>{
        if (snapshot.exists()){
            
            const informe = snapshot.val();
            const resultados = Object.values(informe.informe_resultados[0]);

            //Imprime los resultados del informe y los datos del informe
            const informeData = [informe, resultados]
            return informeData;

        }else{
            console.log('No existe ese informe en la base de datos...')
            return []
        }
    })
    )
    .catch((err =>{throw err}))
}

//Funcion para crear un informe, recibe los parametros de necesarios para crear un informe
export const setInforme = async({uid_cliente, no_solicitud, fecha_entrega, fecha_recepcion, uid_package, no_muestras, observaciones, procedencia, tipo_cultivo}) => {
    const db = getDatabase() ;
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
        tipo_cultivo: tipo_cultivo
    }

    await set(ref(db, `informes/${currentInformeId}`), informeParams);
    await setResultados(currentInformeId);

    return console.log('Informe registrado exitosamente!' )
}

//Actualizar un informe pasandole un objeto como parametro
export const updateInforme = async ( informeId, {...params}) => {
    updateData(`informes/${informeId}`, {...params});
}

const setResultados = async (informeId, id_lab) => {
    //Obtener el informe y obtener al paquete que tiene para los elementos
    const db = getDatabase();
    const informeRef = ref(db, `informes/${informeId}`);

    try {
        const informeSnap = await get(informeRef)

        if(informeSnap.exists()){
            const informeData = informeSnap.val();      
            const informeIdPaquete = informeData.uid_package

            const createCalculo = push(ref(db,`calculos`));

            await set(createCalculo, {
                fecha_creacion: new Date().toISOString()
            });
            const currentCalculo = createCalculo.key;

            const paquetesRef = ref(db, `paquetes/${informeIdPaquete}`);
            const paqueteSnap = await get(paquetesRef );

            if (paqueteSnap.exists()) {
                const paqueteData = paqueteSnap.val() ;
                const paqueteArray =  paqueteData.analisis;


                const elementosPaquete = {}
                for (let i = 0; i < paqueteArray.length; i++) {
                    const elemento = paqueteArray[i];
                    elementosPaquete[elemento] = '' ;
                }

                const resultadosParams = {
                    id_lab,
                    uid_calculo: currentCalculo,
                    resultados: elementosPaquete
                }
            
                await set(ref(db, `informes/${informeId}/informe_resultados`), [resultadosParams] );
                return console.log('Los datos fueron agregados');
            }       
        }
    } catch (error) {
        throw error
    } 
}
