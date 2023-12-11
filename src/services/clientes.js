import { getDatabase, ref, child, get} from "firebase/database";
import { app } from '../app/firebase';

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


