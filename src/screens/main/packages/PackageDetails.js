import EditInfo from '../../../components/common/Forms/EditInfo';
// Redux
import { useSelector } from 'react-redux';

export default PackageDetails = ({}) => {
    const report = useSelector(state => state.report);

    const placeholders = {
        'Nombre': report.no_muestras ? report.no_muestras : 'Nombre del paquete',
        'Tipo Análisis': report.observaciones ? report.observaciones : 'Escribe el tipo de análisis',
    };

    return (
        <>
            <EditInfo sliceFields={placeholders} />
        </>
    );
};