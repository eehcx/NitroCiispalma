import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';


export const getReportes = (idClient) =>{

    const db = getDatabase();
    const informesRef = ref(db, 'clientes/' + idClient + '/informes') 

    get(informesRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const informesCliente = snapshot.val();
            console.log('Informes del cliente: ', informesCliente)
            return informesCliente;
        }
        else
        {
            console.log('El cliente no tiene informes o no existe' );
            return [];
        }
    })
    .catch((error) =>{
        console.error('Error al obtener informes del cliente', error);
        return error;
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