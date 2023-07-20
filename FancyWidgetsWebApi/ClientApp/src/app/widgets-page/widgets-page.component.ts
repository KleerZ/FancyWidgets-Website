import {Component, OnInit} from '@angular/core';
import {WidgetService} from "../../common/services/widget.service";
import {WidgetModel} from "../../common/models/widgetModel";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-widgets-page',
  templateUrl: './widgets-page.component.html',
  styleUrls: ['./widgets-page.component.sass']
})
export class WidgetsPageComponent implements OnInit {

  widgets: WidgetModel[] = []

  constructor(private widgetService: WidgetService) {
    this.widgetService.getAll()
      .subscribe(value => this.widgets = value)
  }

  ngOnInit(): void {
    // this.widgetService.getAll()
    //   .subscribe(value => this.widgets = value)
  }

}
