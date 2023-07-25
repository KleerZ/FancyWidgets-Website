import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
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
export class WhatsNewComponent implements AfterViewInit {

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

  async getGetAllWidgetsUpdates(){
    this.checkInputById('vbtn-radio2')
    this.isLoaded = false
    this.showWidgetUpdates = false
    this.updates = await firstValueFrom(this.whatsNewService.getAllWidgetsUpdates())
    this.isLoaded = true
  }

  async getGetAllApplicationUpdates(){
    this.checkInputById('vbtn-radio3')
    this.isLoaded = false
    this.showWidgetUpdates = false
    this.updates = await firstValueFrom(this.whatsNewService.getAllApplicationUpdates())
    this.isLoaded = true
  }

  checkInputById(id: string){
    let input: any = document.getElementById(id)!
    console.log(input)
    input!.checked = true
  }
}
