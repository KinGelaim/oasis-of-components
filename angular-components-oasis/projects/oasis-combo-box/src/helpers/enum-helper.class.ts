import { ComboBoxResultProcessing } from "../shared/combo-box-result-processing.enum";

/**
 * Класс помощник для перечислений
 */
export class EnumHelper {
  /**
   * Проверяет наличие флага в объединенном значение флагов
   * @param unitedResultProcessing Объединенное значение флагов
   * @param resultProcessing Флаг, который нужно проверить
   */
  public static checkResultProcessing(unitedResultProcessing: ComboBoxResultProcessing, resultProcessing: ComboBoxResultProcessing): boolean {
    return (unitedResultProcessing & resultProcessing) === resultProcessing;
  }
}