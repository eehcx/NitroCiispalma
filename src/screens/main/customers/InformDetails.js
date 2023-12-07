import EditInfo from '../../../components/interface/Forms/EditInfo';
// Redux
import { useSelector } from 'react-redux';

export default InformDetails = ({}) => {
    const report = useSelector(state => state.report);

    const placeholders = {
        'No. Muestras': report.no_muestras ? report.no_muestras : 'Muestras del informe',
        'Observaciones': report.observaciones ? report.observaciones : 'Escribe las observaciones',
        'Procedencia': report.procedencia ? report.procedencia : 'Procedencia de las muestras',
        'Tipo Cultivo': report.tipo_cultivo ? report.tipo_cultivo : 'Tipo de cultivo',
    };

    return (
        <>
            <EditInfo sliceFields={placeholders} />
        </>
    );
};