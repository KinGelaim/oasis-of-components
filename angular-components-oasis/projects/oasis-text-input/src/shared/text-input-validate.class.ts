import { TextInputRegularExpressionExecute } from './text-input-regular-expression-execute.enum';
import { RegExpLabelInputField, TextInputRegularExpression } from './text-input-regular-expression.enum';
import { TextInputSettings } from './text-input-settings.class';
import { TextInputType } from './text-input-type.enum';

/**
 * Проверки для назначаемого значения
 */
export class TextInputValidate {
  /**
   * Выполняет валидацию значения назначенного или вводимого в поле ввода
   */
  public validateInputValue(value: any, inputSettings: TextInputSettings, replaceCharacter: boolean): string {
    if (inputSettings.type == TextInputType.Disable) {
      return value;
    }

    let notRegular = inputSettings.regularExpression != TextInputRegularExpression.NotUse;
    let notUseRegular = inputSettings.regularExpressionExecute != TextInputRegularExpressionExecute.NotUse;
    if (notRegular && notUseRegular) {
      value = this.validateRegExpValue(value, inputSettings, replaceCharacter);
    } else {
      inputSettings.setType(TextInputType.Normal, false);
    }

    if (inputSettings.type != TextInputType.Error) {
      inputSettings.setType(this.validateLengthValue(value, inputSettings), false);
    }

    return value;
  }

  /**
   * Валидация по длине значения
   */
  public validateLengthValue(value: any, inputSettings: TextInputSettings): TextInputType {
    const shortLength = value.length < inputSettings.minCharacters;
    const longLength = value.length > inputSettings.maxCharacters;
    const type = shortLength || longLength ? TextInputType.Error : TextInputType.Normal;

    return type;
  }

  /**
   * Валидация по регулярному выражению
   */
  private validateRegExpValue(value: any, inputSettings: TextInputSettings, replaceCharacter: boolean): string {
    let currentRegExpNumber = Number(inputSettings.regularExpression);
    let currentRegExp = !isNaN(currentRegExpNumber) ? RegExpLabelInputField.get(currentRegExpNumber) : inputSettings.regularExpression;

    if (replaceCharacter && inputSettings.regularExpressionExecute == TextInputRegularExpressionExecute.InputProhibition) {
      if (value.length == 0) {
        return value;
      }

      let result = value.match(currentRegExp);
      if (result == null) {
        value = inputSettings.value;
      }

      inputSettings.setType(TextInputType.Normal, false);
    } else {
      inputSettings.setType(value.match(currentRegExp) ? TextInputType.Normal : TextInputType.Error, false);
    }

    return value;
  }
}