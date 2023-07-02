import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit, QueryList,
  SimpleChanges,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Docs} from "../../docs/docs";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import {MarkdownComponent} from "ngx-markdown";


@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.sass']
})
export class DocsPageComponent implements AfterViewInit, OnChanges{

  protected readonly Docs = Docs;
  showSidebar = true;
  markdownText: string = Docs.welcome;

  @ViewChild('markdown', {static: true}) markdownElement!: ElementRef;
  @ViewChildren(MarkdownComponent) anotherComponents!: QueryList<MarkdownComponent>;

  searchQuery: string = ""
  searchResults: any[] = []

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe(url => {
      this.changeMarkdownByUrl(url)
      this.highlightFoundedText(url)
    })
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  changeMarkdownByUrl(url: UrlSegment[]) {
    this.highlightFoundedText(url)
    if (url[1].path.split('?')[0] === 'welcome' || url[1].path === 'welcome')
      this.markdownText = Docs.welcome
    if (url[1].path.split('?')[0] === 'getting-started' || url[1].path === 'getting-started')
      this.markdownText = Docs.gettingStarted
    if (url[1].path.split('?')[0] === 'context-menu' || url[1].path === 'context-menu')
      this.markdownText = Docs.contextMenu
    if (url[1].path.split('?')[0] === 'settings' || url[1].path === 'settings')
      this.markdownText = Docs.settings
    if (url[1].path.split('?')[0] === 'components' || url[1].path === 'components')
      this.markdownText = Docs.components
    if (url[1].path.split('?')[0] === 'settings-provider' || url[1].path === 'settings-provider')
      this.markdownText = Docs.settingsProvider
    if (url[1].path.split('?')[0] === 'dependency-injection' || url[1].path === 'dependency-injection')
      this.markdownText = Docs.di
  }

  highlightFoundedText(url: UrlSegment[]) {
    let element = document.querySelector('markdown');
    let text = url[1].path.split('?search=')[1]

    element!.querySelectorAll('pre code').forEach((value, key) => {
      value.classList.add('highlighted')
    })

    element!.querySelectorAll('code').forEach((value, key) => {
      value.classList.add('highlighted')
    })

    for (let z of this.markdownElement.nativeElement.children){

      for (let p of z.getElementsByTagName('code')){
        p.style.color = 'yellow'
      }
    }

  }

  ngAfterViewInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.changeMarkdownByUrl(url)
      this.highlightFoundedText(url)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes[this.markdownText])
      console.log('changed')
  }

}
