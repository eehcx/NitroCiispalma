import { getDatabase, ref, child, get} from "firebase/database";

export const getClientes = () => {
    const db = ref(getDatabase());
    const clientesRef = child(db, 'clientes');

    const onClientesValue = get(clientesRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const clientesData = snapshot.val();
                
                // Itera a través de los clientes
                Object.keys(clientesData).forEach((clienteKey) => 
                {
                    const cliente = clientesData[clienteKey];
                    console.log(cliente)
                    return cliente
                });
            } else {
                console.log("No hay datos disponibles en la colección 'clientes'.");
            }
        })
        .catch((error) => {
            console.error("Error al obtener informes del cliente", error);
            throw error
        });

    return () => {
        onClientesValue;
    };
};

