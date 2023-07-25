import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {WhatsNewService} from "../../common/services/whats-new.service";
import {WhatsNewModel} from "../../common/models/whatsNewModel";
import {firstValueFrom} from "rxjs";

import {ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../common/services/widget.service";
import {WidgetModel} from "../../common/models/widgetModel";

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.sass']
})
export class WhatsNewComponent implements AfterViewInit {
  startFromValue: number = 0
  startToValue: number = 5

  isLoaded: boolean = false
  updates: WhatsNewModel[] = []
  from: number = this.startFromValue
  to: number = this.startToValue

  showWidgetUpdates: boolean = false
  widget: WidgetModel = {id: 0, description: '', name: '', downloadUrl: '', imageUrl: '', version: ''};

  constructor(private whatsNewService: WhatsNewService,
              private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) {

  }

  async ngAfterViewInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe(async value => {
      if (value.get('category') === 'widgets') {
        await this.getGetAllWidgetsUpdates()
        return
      }

      if (value.get('category') === 'application') {
        await this.getGetAllApplicationUpdates()
        return
      }

      if (value.get('category')) {
        await this.getWidgetChangelogById(value.get('category')!)
        return
      }

      this.updates = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to))
      this.isLoaded = true
    })
  }

  async onScroll() {
    this.from = this.to + 1
    this.to += 4
    let results: WhatsNewModel[] = []

    switch (this.activatedRoute.snapshot.paramMap.get('category')) {
      case 'widgets':
        results = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to, 'widgets'))
        break;
      case 'application':
        results = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to, 'application'))
        break;
      case null:
        results = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to))
        break;
    }
    this.updates.push(...results)
  }

  async getWidgetChangelogById(id: string) {
    this.showWidgetUpdates = true
    this.widget = await firstValueFrom(this.widgetService.getById(id))
    this.updates = await firstValueFrom(this.whatsNewService.getByWidgetId(id))
    this.isLoaded = true
  }

  async getGetAllWidgetsUpdates() {
    this.from = this.startFromValue
    this.to = this.startToValue
    this.checkInputById('vbtn-radio2')
    this.isLoaded = false
    this.showWidgetUpdates = false
    this.updates = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to, 'widgets'))
    this.isLoaded = true
  }

  async getGetAllApplicationUpdates() {
    this.from = this.startFromValue
    this.to = this.startToValue
    this.checkInputById('vbtn-radio3')
    this.isLoaded = false
    this.showWidgetUpdates = false
    this.updates = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to, 'application'))
    this.isLoaded = true
  }

  checkInputById(id: string) {
    let input: any = document.getElementById(id)!
    input!.checked = true
  }
}
