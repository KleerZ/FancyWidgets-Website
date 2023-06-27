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
  navbarElement!: any

  @ViewChild('navBarComponent') navbar!: HTMLDivElement

  constructor(
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.handleRouteEvents();
    this.setFooterVisibility();
    this.setNavbarPosition();
  }

  setFooterVisibility() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !event.url.includes('/docs');
      }
    });
  }

  setNavbarPosition() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/docs')) {
          this.navbarElement.style.setProperty('top', '0')
          this.navbarElement.style.setProperty('position', 'sticky')
          this.navbarElement.style.setProperty('width', '100%')
          this.navbarElement.style.setProperty('z-index', '200')
        }
        else {
          this.navbarElement.style.setProperty('top', '0')
          this.navbarElement.style.setProperty('position', 'relative')
        }
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
