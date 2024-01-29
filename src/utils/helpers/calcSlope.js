import { Decimal } from "decimal.js";

export default function calcSlope(data) {
    // Obtener los puntos(dot) de la curva
    const x = data.map(dot => new Decimal(dot.concentracion));
    const y = data.map(dot => new Decimal(dot.abs));

    // Calcular la pendiente utilizando todos los puntos
    const n = x.length;
    const sumXY = x.map((xi, i) => xi.mul(y[i])).reduce((acc, val) => acc.add(val), new Decimal(0));
    const sumX = x.reduce((acc, val) => acc.add(val), new Decimal(0));
    const sumY = y.reduce((acc, val) => acc.add(val), new Decimal(0));
    const sumXSquare = x.map(xi => xi.pow(2)).reduce((acc, val) => acc.add(val), new Decimal(0));

    const slope = (n * sumXY - sumX.mul(sumY)) / (n * sumXSquare - sumX.pow(2));

    // Devolver la pendiente
    return slope;
}