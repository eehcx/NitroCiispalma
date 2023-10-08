import { getDatabase, ref, get } from 'firebase/database';


export const getReportes = (idClient) =>{

    const db = getDatabase();
    const informesRef = ref(db, 'clientes/' + idClient + '/informes') 

    return get(informesRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const informesCliente = snapshot.val();
            return informesCliente;
        }
        else
        {
            return [];
        }
    })
    .catch((error) =>{
        console.error('Error al obtener informes del cliente', error);
        throw error;
    })    
}


export const getResultados = (idClient, idReport) => {
    
    const db = getDatabase();
    const resultadosRef = ref(db, 'clientes/' + idClient + '/informes/' + idReport + '/informe_resultados' );

    get(resultadosRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const resultados =snapshot.val();
            console.log('Info del informe: ', resultados);
            return resultados
        }
        else{
            console.log('No hay resultados')
            return []
        }
    })
    .catch((error) =>{
        console.error(error);
        return error
    })


}