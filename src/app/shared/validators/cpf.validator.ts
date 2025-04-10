import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(
  control: AbstractControl
): ValidationErrors | null {
  const cpf = control.value?.replace(/\D/g, '');

  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return { cpf: true };
  }

  const calcCheckDigit = (base: string, factor: number): number => {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i], 10) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base = cpf.substring(0, 9);
  const digit1 = calcCheckDigit(base, 10);
  const digit2 = calcCheckDigit(base + digit1, 11);

  if (cpf !== base + digit1 + digit2) {
    return { cpf: true };
  }

  return null;
}
