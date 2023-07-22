import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {NgOptimizedImage} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {MarkdownModule} from "ngx-markdown";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FooterComponent} from "./footer/footer.component";
import {WidgetsPageComponent} from "./widgets-page/widgets-page.component";
import {WidgetCardComponent} from "./widget-card/widget-card.component";
import {HowToUsePageComponent} from "./how-to-use-page/how-to-use-page.component";
import {SupportPageComponent} from "./support-page/support-page.component";
import {DownloadButtonComponent} from "./download-button/download-button.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {DocsPageComponent} from "./docs-page/docs-page.component";
import { SearchComponent } from './search/search.component';
import {LoaderComponent} from "./loader/loader.component";
import {WhatsNewComponent} from "./whats-new/whats-new.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {WhatsNewBlockComponent} from "./whats-new-block/whats-new-block.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    WidgetsPageComponent,
    WidgetCardComponent,
    HowToUsePageComponent,
    SupportPageComponent,
    DownloadButtonComponent,
    SidebarComponent,
    DocsPageComponent,
    SearchComponent,
    LoaderComponent,
    WhatsNewComponent,
    WhatsNewBlockComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgOptimizedImage,
        AppRoutingModule,
        MarkdownModule.forRoot({
            loader: HttpClient
        }),
        InfiniteScrollModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
