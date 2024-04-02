import { Decimal } from "decimal.js";

export default function calcAverage(data) {
    let sum = data.reduce((accumulator, currentValue) => {
        return new Decimal(accumulator).plus(new Decimal(currentValue));
    }, new Decimal(0));

    return sum.dividedBy(data.length);
}
