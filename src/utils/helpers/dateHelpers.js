// utils/dateHelpers.js

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export function formatDateToString(date) {
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}

/* HOW TO USE:
##############
import React from 'react';
import { Text } from 'react-native';
import { formatDateToString } from './ruta-hacia-tu-helper/dateHelpers'; // Ajusta la ruta

const YourComponent = () => {
    const currentDate = new Date();
    const formattedDate = formatDateToString(currentDate);

    return (
        <Text>{formattedDate}</Text>
    );
};

export default YourComponent;
##############
*/
