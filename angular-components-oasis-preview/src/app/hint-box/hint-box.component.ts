import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HintBoxColor, HintBoxSettings, HintBoxTextAlignment, HintBoxTrianglePlace, HintBoxUnit, OasisHintBoxComponent } from '@oasis/hint-box';

@Component({
  selector: 'app-hint-box',
  standalone: true,
  imports: [FormsModule, OasisHintBoxComponent],
  templateUrl: './hint-box.component.html',
  styleUrl: './hint-box.component.scss'
})
export class HintBoxComponent {
  /** Текущие настройки */
  public hintBoxSettings: HintBoxSettings;

  /** Алиас цвета подсказки */
  public HintBoxColor = HintBoxColor;

  /** Алиас расположения треугольника */
  public HintBoxTrianglePlace = HintBoxTrianglePlace;

  /** Алиас выравнивания текста внутри подсказки */
  public HintBoxTextAlignment = HintBoxTextAlignment;

  /** Алиас единиц измерения компонента */
  public HintBoxUnit = HintBoxUnit;

  public constructor() {
    this.hintBoxSettings = new HintBoxSettings(HintBoxColor.Light, HintBoxTrianglePlace.Bottom, 'Контент', HintBoxTextAlignment.Left, 500);
  }

  /** Пример текста с разными цветами */
  public lineBreak: string = `Введите адрес объекта в формате:<br><span class='hint-box__color-blue'>Город, улица, дом<span>`;

  /** Пример текста в виде таблицы */
  public table: string = `Подобрана замена:<br><table class='table'>
    <tr class='row'>
      <th class='name'>ФИО</th>
      <td class='value'>Петренко А.М.</td>
    </tr>
    <tr class='row'>
      <th class='name'>Таб. №</th>
      <td class='value'>62987</td>
    </tr>
    <tr class='row'>
      <th class='name'>Группа</th>
      <td class='value'>№1 ГСВ</td>
    </tr>
    <tr class='row'>
      <th class='name'>Точка охраны</th>
      <td class='value'>ГСВ: КПП 1/3</td>
    </tr>
    <tr class='row'>
      <th class='name'>График</th>
      <td class='value'>153</td>
    </tr>
  </table>`;

  /** Пример текста с картинкой */
  public image: string = `Тотемное животное:<br><br><img src='./assets/test-assets/hint-box/turtle.png'>`;
}