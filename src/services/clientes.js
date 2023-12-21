import { getDatabase, ref, child, get, push, set } from "firebase/database";
import { updateData } from "./services";

export const getClientes = async () => {
    try {
        const db = getDatabase();
        const clientesRef = child(ref(db), 'clientes');
        
        const snapshot = await get(clientesRef);

        if (snapshot.exists()) {
            const clientesData = snapshot.val();

            const clientesArray = Object.keys(clientesData).map((clienteKey) => ({ ...clientesData[clienteKey]}) );
            return clientesArray;
        } else {
            console.log("No hay datos disponibles en la colección 'clientes'.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener informes del cliente", error);
        throw error;
    }
};

export const setCliente = async (nombre, razon_social, telefono) => {
    try {
        // Obtener la referencia a la base de datos
        const db = getDatabase();
        // Crear un nuevo nodo (cliente) con push()
        const nuevoClienteRef = push(ref(db, 'clientes'));
        // Obtener el ID generado
        const newClientId = nuevoClienteRef.key;
        
        // Objeto de datos
        const newClientData = {
            uid: newClientId,
            nombre: nombre,
            razon_social: razon_social,
            telefono: telefono,
            fecha_creacion: new Date().toISOString(),
        };
        // Guardando el cliente
        await set(ref(db, `clientes/${newClientId}`), newClientData);
        console.log('Client Saved!' + newClientId);
    } catch (error) {
    console.error('Error al guardar el cliente:', error);
    }
}

export const updateCliente = async (clienteId, {...params}) =>{
    updateData('clientes', clienteId, {...params});
}