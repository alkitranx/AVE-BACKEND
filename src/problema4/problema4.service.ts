import { Injectable } from '@nestjs/common';

@Injectable()
export class Problem4Service {
  validatorNumberArray(payload) {
    const quantityElements = payload.length;
    const quantityPairs = payload.filter((num) => num % 2 === 0).length;
    const oddQuantity = quantityElements - quantityPairs;
    const quantityOver1000 = payload.filter((num) => num > 1000).length;
    const higherValue = Math.max(...payload);
    const lesserValue = Math.min(...payload);
    const amountTotal = payload.reduce((a, b) => a + b, 0);
    const average = amountTotal / quantityElements;
    const minimumPercentage = (lesserValue / higherValue) * 100;
    const averagePercentage = (average / higherValue) * 100;

    return {
      quantityElements,
      oddQuantity,
      quantityPairs,
      quantityOver1000,
      higherValue,
      lesserValue,
      amountTotal,
      average,
      minimumPercentage,
      averagePercentage,
    };
  }
}
