/**
 * Основные типы данных, которые можно вводить
 * TODO: Пополнять по мере появления стандартных регулярных выражений
 */
export enum TextInputRegularExpression {
  /** Регулярного выражения нет */
  NotUse = 1,

  /** Только цифры */
  Digit = 2,

  /** Только цифры и точка */
  DigitDot = 3,

  /** Только цифры, точка и запятая */
  DigitDotComma = 4,

  /** Только кириллица и цифры */
  CyrillicDigit = 5,

  /** Только кириллица и пробелы */
  CyrillicSpace = 6,

  /** Почтовый ящик */
  Email = 7
}

/** Соответствие enum и регулярных выражений */
export const RegExpLabelInputField = new Map<number, RegExp>([
  [TextInputRegularExpression.NotUse, /.*/g],
  [TextInputRegularExpression.Digit, /^[\d]+$/g],
  [TextInputRegularExpression.DigitDot, /^[\d\.]+$/g],
  [TextInputRegularExpression.DigitDotComma, /^[\d\.,]+$/g],
  [TextInputRegularExpression.CyrillicDigit, /^[А-Яа-я0-9]+$/g],
  [TextInputRegularExpression.CyrillicSpace, /^[А-ЯЁа-яё ]+$/g],
  [TextInputRegularExpression.Email, /^(?!\.)(\"([^\"\r\\]|\\[\"\r\\])*\"|([-a-z0-9!#$%&'*+/=?^_`{|}~]|(^|[^\.])\.)*)@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$/g]
]);