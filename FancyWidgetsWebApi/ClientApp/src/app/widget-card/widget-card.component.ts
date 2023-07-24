import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-widget-card',
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.sass']
})
export class WidgetCardComponent {
  @Input()
  public id: number = 0

  @Input()
  public title: string = ""

  @Input()
  public description: string = ""

  @Input()
  public url: string = ""

  @Input()
  public imagePath: string = ""

  @Input()
  public version: string = ""
}
