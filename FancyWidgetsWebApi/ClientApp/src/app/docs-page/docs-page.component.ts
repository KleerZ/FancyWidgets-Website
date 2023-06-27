import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Docs} from "../../docs/docs";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.sass'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DocsPageComponent {

  protected readonly Docs = Docs;
  showSidebar = true;
  markdownText: string = Docs.welcome;

  @ViewChild('markdown') markdown!: HTMLElement

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.url.subscribe(url => {
      this.changeMarkdownByUrl(url)
    })
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  changeMarkdownByUrl(url: UrlSegment[]){
    if (url[1].path === 'welcome')
      this.markdownText = Docs.welcome
    if (url[1].path === 'getting-started')
      this.markdownText = Docs.gettingStarted
    if (url[1].path === 'context-menu')
      this.markdownText = Docs.contextMenu
    if (url[1].path === 'settings')
      this.markdownText = Docs.settings
    if (url[1].path === 'components')
      this.markdownText = Docs.components
    if (url[1].path === 'settings-provider')
      this.markdownText = Docs.settingsProvider
    if (url[1].path === 'dependency-injection')
      this.markdownText = Docs.di
  }
}
