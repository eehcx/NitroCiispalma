import Decimal from 'decimal.js';

export function sulfurCalc(AbsM, AbsB, m, b, aforo, pesoMuestra, alicuota) {
    // Convertir todos los parámetros a objetos Decimal
    const decimalAbsM = new Decimal(AbsM);
    const decimalAbsB = new Decimal(AbsB);
    const decimalM = new Decimal(m);
    const decimalB = new Decimal(b);
    const decimalAforo = new Decimal(aforo);
    const decimalPesoMuestra = new Decimal(pesoMuestra);
    const decimalAlicuota = new Decimal(alicuota);

    // Calcular FDM y FDV
    const FDM = decimalAforo.div(decimalPesoMuestra);
    const FDV = decimalAforo.div(decimalAlicuota);

    // Realizar el cálculo principal
    const result = decimalAbsM.minus(decimalAbsB).div(decimalM.add(decimalB)).times(FDM).times(FDV).toNumber();

    return result;
}

export function boronCalc(AbsM, AbsB, m, Extractante, pesoMuestra) {
    // Convertir todos los parámetros a objetos Decimal
    const decimalAbsM = new Decimal(AbsM);
    const decimalAbsB = new Decimal(AbsB);
    const decimalM = new Decimal(m);
    const decimalExtractante = new Decimal(Extractante);
    const decimalPesoMuestra = new Decimal(pesoMuestra);

    // Calcular FDM
    const FDM = decimalExtractante.div(decimalPesoMuestra);

    // Realizar el cálculo principal
    const result = decimalAbsM.minus(decimalAbsB).div(decimalM).times(FDM).toNumber();

    return result;
}

export function macroPctCalc(mgL_M, mgL_B, aforo, pesoMuestra) {
    // Convertir todos los parámetros a objetos Decimal
    const decimalMgL_M = new Decimal(mgL_M);
    const decimalMgL_B = new Decimal(mgL_B);
    const decimalAforo = new Decimal(aforo);
    const decimalPesoMuestra = new Decimal(pesoMuestra);

    // Calcular FDM
    const FDM = decimalAforo.div(decimalPesoMuestra);

    // Realizar el cálculo principal
    const result = decimalMgL_M.minus(decimalMgL_B).times(FDM).div(10000).toNumber();
    
    return result;
}

export function micronutrientsCalc(mgL_M, mgL_B, aforo, pesoMuestra) {
    // Convertir todos los parámetros a objetos Decimal
    const decimalMgL_M = new Decimal(mgL_M);
    const decimalMgL_B = new Decimal(mgL_B);
    const decimalAforo = new Decimal(aforo);
    const decimalPesoMuestra = new Decimal(pesoMuestra);

    // Calcular FDM
    const FDM = decimalAforo.div(decimalPesoMuestra);

    // Realizar el cálculo principal
    const result = decimalMgL_M.minus(decimalMgL_B).times(FDM).toNumber();

    return result;
}

export function pctJentCalc(Vm, Vb, N, p) {
    // Convertir todos los parámetros a objetos Decimal
    const decimalVm = new Decimal(Vm);
    const decimalVb = new Decimal(Vb);
    const decimalN = new Decimal(N);
    const decimalP = new Decimal(p);

    // Realizar el cálculo principal
    const result = decimalVm.minus(decimalVb).times(decimalN).times(14).div(decimalP).div(10).toNumber();

    return result;
}

export function pctJepCalc(AbsM, AbsB, m, b, aforo, pesoMuestra, alicuota) {
    // Convertir todos los parámetros a objetos Decimal
    const decimalAbsM = new Decimal(AbsM);
    const decimalAbsB = new Decimal(AbsB);
    const decimalM = new Decimal(m);
    const decimalB = new Decimal(b);
    const decimalAforo = new Decimal(aforo);
    const decimalPesoMuestra = new Decimal(pesoMuestra);
    const decimalAlicuota = new Decimal(alicuota);

    // Calcular FDM y FDV
    const FDM = decimalAforo.div(decimalPesoMuestra);
    const FDV = decimalAforo.div(decimalAlicuota);

    // Realizar el cálculo principal
    const result = decimalAbsM.minus(decimalAbsB).div(decimalM.add(decimalB)).times(FDM).times(FDV).toNumber();

    return result;
}