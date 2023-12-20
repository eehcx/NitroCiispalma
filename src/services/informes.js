import { getDatabase, ref, get, push, set, orderByChild, equalTo, child, query } from 'firebase/database';
import { updateData } from './services';

const db = getDatabase();

//Funcion para traer todos los informes de un cliente especifico
export const getInformesCliente = async (clientId) => {

    const informesRef = ref(db, 'informes')

    //Este es una consulta para filtrar los informes que tengan el uid del cliente 
    const informeQuery = query(informesRef, ...[orderByChild("uid"), equalTo(clientId)])

    return get(informeQuery).then((snapshot => {
        if (snapshot.exists()) {
            const informesCliente = snapshot.val();
            return informesCliente
        }
        else {
            return 'No existen informes registrados a ese cliente...'
        }
    }))
        .catch((err) => { throw err })
}

// Trae los datos de un informe seleccionado
export const getInforme = async (informeId) => {

    const informeRef = ref(db, 'informes/' + informeId)

    return get(informeRef)
        .then((async snapshot => {
            if (snapshot.exists()) {

                const informe = snapshot.val();
                const resultados = Object.values(informe.informe_resultados[0]);

                //Imprime los resultados del informe y los datos del informe
                const informeData = [informe, resultados]
                return informeData;

            } else {
                console.log('No existe ese informe en la base de datos...')
                return []
            }
        })
        )
        .catch((err => { throw err }))
}

//Funcion para crear un informe, recibe los parametros de necesarios para crear un informe
export const setInforme = async ({ uid_cliente, no_solicitud, fecha_entrega, fecha_recepcion, uid_package, no_muestras, observaciones, procedencia, tipo_cultivo, }) => {

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
    //await setInformeResultados(currentInformeId);

    return console.log('Informe registrado exitosamente!')
}

//Actualizar un informe pasandole un objeto como parametro
export const updateInforme = async (informeId, { ...params }) => {
    updateData(`informes/${informeId}`, { ...params });
}


export const setInformeResultados = async (informeId, arrayResultados) => {
    const informeRef = ref(db, `informes/${informeId}`);

    const informe = await get(informeRef).then(
        informe => {

            const paqueteInforme = informe.val().uid_package
            const paqueteRef = ref(db, `paquetes/${paqueteInforme}`);
            
            const paquete = get(paqueteRef).then(
                async paquete => {
                    const paqueteAnalisis = paquete.val().analisis;
                    const elementosPaquete = {}

                    for (let i = 0; i < paqueteAnalisis.length; i++) {
                        const elemento = paqueteAnalisis[i];
                        elementosPaquete[elemento] = '';
                    }


                    await set(ref(db, `informes/${informeId}/informe_resultados`), [resultadosParams]);
                    return console.log('Los datos fueron agregados');

                }
            )

        }
    );


}

const setInformeResultados_ = async (informeId, id_lab) => {
    //Obtener el informe y obtener al paquete que tiene para los elementos

    const informeRef = ref(db, `informes/${informeId}`);

    try {
        const informeSnap = await get(informeRef)

        if (informeSnap.exists()) {
            const informeData = informeSnap.val();
            const informeIdPaquete = informeData.uid_package

            const createCalculo = push(ref(db, `calculos`));

            await set(createCalculo, {
                fecha_creacion: new Date().toISOString()
            });
            const currentCalculo = createCalculo.key;

            const paquetesRef = ref(db, `paquetes/${informeIdPaquete}`);
            const paqueteSnap = await get(paquetesRef);

            if (paqueteSnap.exists()) {
                const paqueteData = paqueteSnap.val();
                const paqueteArray = paqueteData.analisis;


                const elementosPaquete = {}
                for (let i = 0; i < paqueteArray.length; i++) {
                    const elemento = paqueteArray[i];
                    elementosPaquete[elemento] = '';
                }

                const resultadosParams = {
                    id_lab,
                    uid_calculo: currentCalculo,
                    resultados: elementosPaquete
                }

                await set(ref(db, `informes/${informeId}/informe_resultados`), [resultadosParams]);
                return console.log('Los datos fueron agregados');
            }
        }
    } catch (error) {
        throw error
    }
}
