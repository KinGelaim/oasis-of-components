import { RegExpLabelDigitInput } from "../shared/digit-input-regular-expression.enum";
import { DigitInputSettings } from "../shared/digit-input-settings.class";
import { DigitInputType } from "../shared/digit-input-type.enum";
import { DigitInputVisualType } from "../shared/digit-input-visual-type.enum";

/**
 * Проверки для назначаемого значения
 */
export class DigitInputValidate {
  /**
   * Выполняет валидацию значения назначенного или вводимого в поле ввода
   */
  public validateInputValue(value: string, inputSettings: DigitInputSettings): string {
    value = this.validateRegExpValue(value, inputSettings);
    inputSettings.type = this.validateSizeValue(value, inputSettings) ? DigitInputType.Normal : DigitInputType.Error;

    return value;
  }

  /**
   * Валидация по регулярному выражению
   * @param value изначальное значение
   * @param inputSettings настройки поля ввода
   * @returns значение после валидации
   */
  private validateRegExpValue(value: any, inputSettings: DigitInputSettings): string {
    let currentRegExpNumber = Number(inputSettings.regularExpression);
    let currentRegExp = RegExpLabelDigitInput.get(currentRegExpNumber);

    // Если пусто, то ничего не меняем
    if (value == '') {
      return value;
    }

    // Если есть совпадение, то заменяем
    let result = value.match(currentRegExp);
    if (result == null) {
      value = inputSettings.value;
    }

    let zero = '0';
    let dot = '.';
    let minus = '-';

    // Точка не может быть первой
    if (value.indexOf(dot) == 0) {
      value = '';
    }

    // К примеру '0(0-9)', то убираем ноль
    if (value.indexOf(zero) == 0 && value.indexOf(dot) != 1 && value.length == 2) {
      value = value.substring(1, value.length);
    }

    // К примеру '-0{0-9}', то убираем ноль
    if (value.indexOf(minus) == 0 && value.indexOf(zero) == 1 && value.indexOf(dot) != 2 && value.length == 3) {
      value = value.substring(0, 1) + value.substring(2, value.length);
    }

    // К примеру '-,', то убираем запятую
    if (value.indexOf(minus) == 0 && value.indexOf(dot) == 1) {
      value = value.substring(0, 1);
    }

    return value;
  }

  /**
   * Валидация по размеру значения
   */
  private validateSizeValue(value: string, inputSettings: DigitInputSettings): boolean {
    // Если значение стираем, то красим в невалидное
    if (value == '' && inputSettings.visualType == DigitInputVisualType.TableCell) {
      return false;
    }

    let currentValue = Number(value);

    // Если вдруг не число, то значит значение невалидное
    if (isNaN(currentValue)) {
      return false;
    }

    let moreMaxValue = inputSettings.maxValue != null && value != null && currentValue > inputSettings.maxValue;
    let lessMinValue = inputSettings.minValue != null && value != null && currentValue < inputSettings.minValue;

    return !moreMaxValue && !lessMinValue;
  }
}