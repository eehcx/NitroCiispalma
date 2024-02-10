import Decimal from 'decimal.js';

export function sulfurCalc(AbsM, AbsB, m, b, aforo, pesoMuestra, alicuota) {
    const FDM = new Decimal(aforo).div(pesoMuestra);
    const FDV = new Decimal(aforo).div(alicuota);
    return new Decimal(AbsM).minus(AbsB).div(m + b).times(FDM).times(FDV).toNumber();
}

export function boronCalc(AbsM, AbsB, m, Extractante, pesoMuestra) {
    const FDM = new Decimal(Extractante).div(pesoMuestra);
    return new Decimal(AbsM).minus(AbsB).div(m).times(FDM).toString();
}

export function macroPctCalc(mgL_M, mgL_B, aforo, pesoMuestra) {
    const FDM = new Decimal(aforo).div(pesoMuestra);
    return new Decimal(mgL_M).minus(mgL_B).times(FDM).div(10000).toString();
}

export function micronutrientsCalc(mgL_M, mgL_B, aforo, pesoMuestra) {
    const FDM = new Decimal(aforo).div(pesoMuestra);
    return new Decimal(mgL_M).minus(mgL_B).times(FDM).toString();
}

export function pctJentCalc(Vm, Vb, N, p) {
    return new Decimal(Vm).minus(Vb).times(N).times(14).div(p).div(10).toString();
}

export function pctJepCalc(AbsM, AbsB, m, b, aforo, pesoMuestra, alicuota) {
    const FDM = new Decimal(aforo).div(pesoMuestra);
    const FDV = new Decimal(aforo).div(alicuota);
    return new Decimal(AbsM).minus(AbsB).times(FDM).times(FDV).div(m).div(m + b).div(10000).toString();
}