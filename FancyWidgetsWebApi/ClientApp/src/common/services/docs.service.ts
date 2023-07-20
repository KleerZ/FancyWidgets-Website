import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WidgetModel} from "../models/widgetModel";
import {DocsModel} from "../models/docsModel";

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  readonly baseUrl: string = "api/docs"

  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<DocsModel[]>(`${this.baseUrl}/get-all`)
  }
}
