import {AfterContentInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router, RouterState} from "@angular/router";
import {marked} from "marked";
import HTML = marked.Tokens.HTML;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit{
  title = 'fancy-widgets';
  public showFooter: boolean = true;
  public showNavbar: boolean = true;
  navbarElement!: any

  @ViewChild('navBarComponent') navbar!: HTMLDivElement

  constructor(
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.handleRouteEvents();
    this.setFooterAndNavbarVisibility();
  }

  setFooterAndNavbarVisibility() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !event.url.includes('/docs');
        this.showNavbar = !event.url.includes('/docs');
      }
    });
  }

  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        gtag('event', 'page_view', {
          page_title: title,
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }

  ngAfterContentInit(): void {
    this.navbarElement = document.querySelector('#navbar')
  }
}
