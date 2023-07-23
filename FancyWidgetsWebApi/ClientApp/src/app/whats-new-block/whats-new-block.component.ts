import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-whats-new-block',
  templateUrl: './whats-new-block.component.html',
  styleUrls: ['./whats-new-block.component.sass']
})
export class WhatsNewBlockComponent {
  @Input() title: string = ""
  @Input() text: string = ""
  @Input() version: string = ""
  @Input() date!: Date
}
