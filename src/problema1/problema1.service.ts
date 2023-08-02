import { Injectable } from '@nestjs/common';
import { InputDto } from './dto/input.dto';

@Injectable()
export class Problem1Service {
  //Se debe crear una solución que dado 2 números X y Y cualesquiera, se obtenga la
  // multiplicación de los mismos SIN usar el operador de multiplicación *.
  multiplicationWithoutOperator(numbers: InputDto): string {
    const { numberA, numberB } = numbers;

    //valor absoluto independientemente del signo
    const a = Math.abs(numberA);
    const b = Math.abs(numberB);

    let result = 0;

    // ciclo que realiza la  multiplicacion usando el operador de suma
    for (let i = 0; i < b; i++) {
      result += a;
    }
    //logical del signo para aplicar en el resultado
    const sign = Math.sign(numberA) + Math.sign(numberB);
    let signOperator: string;

    if (sign < 1 && sign > -2) {
      signOperator = '-';
    }

    return `la multiplicacion del numero ${numberA} y  ${numberB} tiene como resultado ${
      numberA !== 0
        ? result
        : numberB !== 0
        ? Number(`${signOperator}${result}`)
        : 0
    }`;
  }
}
