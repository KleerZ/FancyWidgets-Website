import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WidgetsPageComponent} from "./widgets-page/widgets-page.component";
import {HowToUsePageComponent} from "./how-to-use-page/how-to-use-page.component";
import {SupportPageComponent} from "./support-page/support-page.component";
import {DocsPageComponent} from "./docs-page/docs-page.component";
import {WhatsNewComponent} from "./whats-new/whats-new.component";
import {SupportProjectComponent} from "./support-project/support-project.component";

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full", title: "Fancy Widgets"},
  {path: "widgets", component: WidgetsPageComponent, pathMatch: "full", title: "Fancy Widgets - Widgets"},
  {path: "how-to-use", component: HowToUsePageComponent, pathMatch: "full", title: "Fancy Widgets - How to use?"},
  {path: "support", component: SupportPageComponent, pathMatch: "full", title: "Fancy Widgets - Support"},
  {path: "docs", component: DocsPageComponent, pathMatch: "full", title: "Fancy Widgets - Docs"},
  {path: "docs/:page", component: DocsPageComponent, pathMatch: "full", title: "Fancy Widgets - Docs"},
  {path: "docs/:page/:search", component: DocsPageComponent, pathMatch: "full", title: "Fancy Widgets - Docs"},
  {path: "whats-new", component: WhatsNewComponent, pathMatch: "full", title: "Fancy Widgets - What's New"},
  {path: "whats-new/:category", component: WhatsNewComponent, title: "Fancy Widgets - What's New"},
  {path: "support-project", component: SupportProjectComponent, pathMatch: "full", title: "Fancy Widgets - Support Project"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
