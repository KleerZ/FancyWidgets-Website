import {Component, OnInit} from '@angular/core';
import {WhatsNewService} from "../../common/services/whats-new.service";
import {WhatsNewModel} from "../../common/models/whatsNewModel";
import {firstValueFrom} from "rxjs";
import {HtmlParser} from "@angular/compiler";

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.sass']
})
export class WhatsNewComponent implements OnInit {

  updates: WhatsNewModel[] = []
  from: number = 0
  to: number = 5

  constructor(private whatsNewService: WhatsNewService) {

  }

  async ngOnInit(): Promise<void> {
    this.updates = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to))
    console.log('start')
    console.log('from: ' + this.from )
    console.log('to: ' + this.to )
    console.log('----------------------')
  }

  async onScroll(){
    this.from = this.to + 1
    this.to += 4
    console.log('from: ' + this.from )
    console.log('to: ' + this.to )
    let results = await firstValueFrom(this.whatsNewService.getRange(this.from, this.to))
    console.log(results.length)

    this.updates.push(...results)

  }
}
