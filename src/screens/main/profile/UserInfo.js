import React, { useState, useEffect } from 'react';
// Componentes
import EditInfo from '../../../components/common/Forms/EditInfo';
// Redux
import { useSelector } from 'react-redux';

const UserInformationScreen = () => {
    const user = useSelector(state => state.user);

    const placeholders = {
        'Nombre': user.displayName ? user.displayName : 'Establecer un Nombre',
        'Email':  user.email ? user.email : 'Establecer un Email',
        'Teléfono': user.phoneNumber ? user.phoneNumber : 'Establecer un Teléfono'
    };

    return (
        <>
            <EditInfo sliceFields={placeholders} />
        </>
    );
};
export default UserInformationScreen;