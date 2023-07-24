import {Component, OnInit} from '@angular/core';
import {WhatsNewService} from "../../common/services/whats-new.service";
import {WhatsNewModel} from "../../common/models/whatsNewModel";
import {firstValueFrom} from "rxjs";
import {HtmlParser} from "@angular/compiler";
import {ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../common/services/widget.service";
import {WidgetModel} from "../../common/models/widgetModel";

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.sass']
})
export class WhatsNewComponent implements OnInit {

  isLoaded: boolean = false
  updates: WhatsNewModel[] = []
  from: number = 0
  to: number = 5

  showWidgetUpdates: boolean = false
  widget: WidgetModel = {id: 0, description: '', name: '', downloadUrl: '', imageUrl: '', version: ''};

  constructor(private whatsNewService: WhatsNewService,
              private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) {

  }

  async ngOnInit(): Promise<void> {
    if (this.activatedRoute.snapshot.paramMap.get('widgetId')) {
      await this.getWidgetChangelogById(this.activatedRoute.snapshot.paramMap.get('widgetId')!)
      return
    }

    this.updates = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to))
    this.isLoaded = true
  }

  async onScroll() {
    if (this.activatedRoute.snapshot.paramMap.get('widgetId')) {
      return
    }

    this.from = this.to + 1
    this.to += 4
    let results = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to))
    this.updates.push(...results)
  }

  async getWidgetChangelogById(id: string) {
    this.showWidgetUpdates = true
    this.widget = await firstValueFrom(this.widgetService.getById(id))
    this.updates = await firstValueFrom(this.whatsNewService.getByWidgetId(id))
    this.isLoaded = true
  }
}
