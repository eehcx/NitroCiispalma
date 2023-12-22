import {ref, get, push, set} from 'firebase/database';
import {db, updateData} from './services';

export const getClientes = async () => {
  const clientesRef = ref(db, 'clientes');

  try {
    const clientesSnapshot = await get(clientesRef);

    if (clientesSnapshot.exists()) {
      const clientesData = clientesSnapshot.val();

      const clientesArray = Object.keys(clientesData).map(clienteKey => ({
        ...clientesData[clienteKey],
      }));

      return clientesArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message);
    throw new Error('Hubo un error al obtener los clientes');
  }
};

export const setCliente = async (nombre, razon_social, telefono) => {
  try {
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
};

export const updateCliente = async (clienteId, {...params}) => {
  updateData('clientes', clienteId, {...params});
};
