import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WidgetModel} from "../models/widgetModel";
import {DocsModel} from "../models/docsModel";
import {WhatsNewModel} from "../models/whatsNewModel";

@Injectable({
  providedIn: 'root'
})
export class WhatsNewService {

  readonly baseUrl: string = "api/whats-new"

  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<WhatsNewModel[]>(`${this.baseUrl}`)
  }

  getRange(from: number, to: number){
    return this.http.get<WhatsNewModel[]>(`${this.baseUrl}/get-range?from=${from}&to=${to}`)
  }
}
