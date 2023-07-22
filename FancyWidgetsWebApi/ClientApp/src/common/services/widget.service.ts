import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WidgetModel} from "../models/widgetModel";

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  readonly baseUrl: string = "api/widgets"

  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<WidgetModel[]>(this.baseUrl)
  }
}
