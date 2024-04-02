import { Decimal } from "decimal.js";

export default function calcSlope(data) {
    // Mapea las propiedades 'concentracion' y 'abs' a dos arrays separados
    const x = data.map(dot => new Decimal(dot.concentracion));
    const y = data.map(dot => new Decimal(dot.abs));

    // Calcular la pendiente utilizando todos los puntos
    const n = x.length;
    // Calcula la suma de los productos de las coordenadas x e y
    const sumXY = x.map((xi, i) => xi.mul(y[i])).reduce((acc, val) => acc.add(val), new Decimal(0));
     // Calcula la suma de las coordenadas x
    const sumX = x.reduce((acc, val) => acc.add(val), new Decimal(0));
     // Calcula la suma de las coordenadas y
    const sumY = y.reduce((acc, val) => acc.add(val), new Decimal(0));
     // Calcula la suma de los cuadrados de las coordenadas x
    const sumXSquare = x.map(xi => xi.pow(2)).reduce((acc, val) => acc.add(val), new Decimal(0));
    // Calcular la pendiente utilizando la fórmula de la regresión lineal simple
    //const slope = (n * sumXY - sumX.mul(sumY)) / (n * sumXSquare - sumX.pow(2));
    const slope = new Decimal((n * sumXY - sumX.mul(sumY)) / (n * sumXSquare - sumX.pow(2)));

    // Calcular la intersección con el eje Y (b)
    const b = sumY.sub(slope.mul(sumX)).div(n);

    // Calcular el coeficiente de determinación(r²)
    const meanX = sumX.div(n);
    const meanY = sumY.div(n);
    const ssTot = y.map(yi => (yi.sub(meanY)).pow(2)).reduce((acc, val) => acc.add(val), new Decimal(0));
    const ssRes = y.map((yi, i) => (yi.sub(slope.mul(x[i]).add(b))).pow(2)).reduce((acc, val) => acc.add(val), new Decimal(0));
    const r2 = new Decimal(1).sub(ssRes.div(ssTot));

    // Devuelve los resultados
    return {slope, b, r2};
}
