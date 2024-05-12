import { DigitInputSettings } from "../shared/digit-input-settings.class";

/**
 * Класс для работы с настройками
 */
export class DigitInputActions {
  /**
   * Проверка на выход из диапазона возможных значений
   */
  public checkAchievedEdgeRange(inputSettings: DigitInputSettings): void {
    let currentValue = Number(inputSettings.value);

    if (isNaN(currentValue)) {
      inputSettings.isAchieveMaxValue = true;
      inputSettings.isAchieveMinValue = true;
      return;
    }

    inputSettings.isAchieveMaxValue = inputSettings.value != '' && inputSettings.maxValue != null && currentValue >= inputSettings.maxValue;
    inputSettings.isAchieveMinValue = inputSettings.value != '' && inputSettings.minValue != null && currentValue <= inputSettings.minValue;
  }
}