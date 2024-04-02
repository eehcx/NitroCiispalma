// reducers.js

import { combineReducers } from 'redux';
import userSlice from './user/userSlice';
import clientSlice from './client/clientSlice';
import informSlice from './client/informSlice';
import reportSlice from './forms/ReportSlice';
import CalculatorSlice from './calc/CalculatorSlice';
import BoroSlice from './calc/foliar/BoroSlice';
import azufreSlice from './calc/foliar/azufreSlice';
import MacronutrientesSlice from './calc/foliar/MacronutrientesSlice';
import MicronutrientesSlice from './calc/foliar/MicronutrientesSlice';
import PorcentaJentSlice from './calc/foliar/PorcentaJentSlice';
import PorcentaJepSlice from './calc/foliar/PorcentaJepSlice';
import CalibrationCurveSlice from './calc/CalibrationCurveSlice';

const rootReducer = combineReducers({
    user: userSlice,
    client: clientSlice,
    inform: informSlice,
    report: reportSlice,
    calculator: CalculatorSlice,
    boro: BoroSlice,
    azufre: azufreSlice,
    macronutrientes: MacronutrientesSlice,
    micronutrientes: MicronutrientesSlice,
    porcentajent: PorcentaJentSlice,
    porcentajep: PorcentaJepSlice,
    calibrationCurve: CalibrationCurveSlice
});

export default rootReducer;