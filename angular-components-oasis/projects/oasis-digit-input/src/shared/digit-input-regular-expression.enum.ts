/**
 * Основные типы данных, которые можно вводить
 */
export enum DigitInputRegularExpression {
  /** Целое число */
  Integer = 1,

  /** Дробное число до десятых */
  FractionalToTenths = 2,

  /** Дробное число до сотых */
  FractionalToHundredths = 3
}

/** Соответствие enum и регулярных выражений */
export const RegExpLabelDigitInput = new Map<number, RegExp>([
  [DigitInputRegularExpression.Integer, /^-?[0-9]*$/g],
  [DigitInputRegularExpression.FractionalToTenths, /^-?[0-9]*(\.?|\,?)[0-9]{0,1}$/g],
  [DigitInputRegularExpression.FractionalToHundredths, /^-?[0-9]*(\.?|\,?)[0-9]{0,2}$/g]
]);