import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class Problem3Service {
  private specialCharacters = [
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '-',
    '_',
    '+',
    '=',
  ];

  //en este en especifico elegi hacerlo aca en el servicio pr cuestion de tiempo pero podria hacerlo con el class validator como validaciones customs y dejar el servicio para logica de negocio
  private hasSpecialCharactersTogether(password: string): boolean {
    for (let i = 0; i < password.length - 1; i++) {
      if (
        this.specialCharacters.includes(password[i]) &&
        this.specialCharacters.includes(password[i + 1])
      ) {
        return true;
      }
    }
    return false;
  }

  private validateDuplicateSpecialCharacters(input: string): boolean {
    for (let i = 0; i < input.length - 1; i++) {
      if (this.specialCharacters.includes(input[i])) {
        for (let j = i + 1; j < input.length; j++) {
          if (input[i] === input[j]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  private hasSpecialCharacters(password: string): boolean {
    let count = 0;
    for (let i = 0; i < password.length; i++) {
      if (this.specialCharacters.includes(password[i])) {
        count++;
        if (count > 1) {
          return true;
        }
      }
    }
    return false;
  }
  private hasConsecutiveNumbers(password: string): boolean {
    for (let i = 0; i < password.length - 1; i++) {
      if (
        password[i] >= '0' &&
        password[i] <= '9' &&
        password[i + 1] >= '0' &&
        password[i + 1] <= '9'
      ) {
        return true;
      }
    }
    return false;
  }
  private hasAtLeastFourNumbers(password: string): boolean {
    let count = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= '0' && password[i] <= '9') {
        count++;
        if (count >= 4) {
          return true;
        }
      }
    }
    return false;
  }
  private hasLowercase(password: string): boolean {
    return password.split('').some((char) => char >= 'a' && char <= 'z');
  }
  private hasUppercase(password: string): boolean {
    return password.split('').some((char) => char >= 'A' && char <= 'Z');
  }
  private hasConsecutiveEqualLetters(password: string): boolean {
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i].toLowerCase() === password[i + 1].toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  passwordValidator(password: string) {
    if (!this.hasLowercase(password) || !this.hasUppercase(password)) {
      throw new BadRequestException(
        'El campo debe tener letras minúsculas y mayúsculas',
      );
    }
    if (this.hasConsecutiveEqualLetters(password)) {
      throw new BadRequestException(
        'El campo no puede tener 2 letras o 2 numeros iguales consecutivas',
      );
    }
    if (
      !this.hasConsecutiveNumbers(password) ||
      !this.hasAtLeastFourNumbers(password)
    ) {
      throw new BadRequestException(
        'El campo debe contener al menos 4 números y no puede tener 2 números iguales consecutivos',
      );
    }
    if (this.validateDuplicateSpecialCharacters(password)) {
      throw new BadRequestException(
        'El campo no debe repetir el mismo caracter especial',
      );
    }
    if (
      !this.hasSpecialCharacters(password) ||
      this.hasSpecialCharactersTogether(password)
    ) {
      throw new BadRequestException(
        'El campo debe tener al menos 2 caracteres especiales (!@#$%^&*-_+=?),y no pueden estar juntos',
      );
    }
    if (password.includes('0')) {
      throw new BadRequestException('El campo no puede contener el número 0');
    }
    if (password.includes(' ')) {
      throw new BadRequestException('El campo no puede contener espacios');
    }
    return password;
  }
}
