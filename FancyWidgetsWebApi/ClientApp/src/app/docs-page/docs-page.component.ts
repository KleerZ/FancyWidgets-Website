import {
  AfterContentInit,
  Component,
  ElementRef, ViewChild
} from '@angular/core';
import {Docs} from "../../docs/docs";
import {ActivatedRoute, UrlSegment} from "@angular/router";
import {MarkdownService} from "ngx-markdown";

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.sass']
})
export class DocsPageComponent implements AfterContentInit {

  protected readonly Docs = Docs;
  showSidebar = true;
  markdownText: string = Docs.welcome;

  @ViewChild('markdown', {static: true, read: ElementRef}) markdownElement!: ElementRef<HTMLElement>;

  searchQuery: string = ""
  searchQuery2: string = ""
  searchResults: any[] = []
  currentUrl: string = ''

  constructor(private activatedRoute: ActivatedRoute, private markdownService: MarkdownService) {
    if (window.innerWidth < 768)
      this.showSidebar = false
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  changeMarkdownByUrl(url: UrlSegment[]) {
    if (!url[1])
      return

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

    this.searchQuery = ''
    this.searchQuery2 = ''

  }

  highlightFoundedText() {
    if (!this.searchQuery && !this.searchQuery2)
      return
    const codeElements = this.markdownElement
      .nativeElement.querySelectorAll('code');
    codeElements.forEach((value, key) => {
      this.resetHighlighting(value);
    })

    codeElements.forEach((codeElement) => {
      this.processCodeElement(<HTMLElement>codeElement);
    });

    this.markdownElement
      .nativeElement.querySelectorAll('h1').forEach((codeElement) => {
      this.processCodeElement(<HTMLElement>codeElement);
    });
  }

  resetHighlighting(element: HTMLElement) {
    const highlightedElements = element.querySelectorAll('.highlighted');
    highlightedElements.forEach((highlightedElement) => {
      highlightedElement.classList.remove('highlighted');
    });
  }

  processCodeElement(element: HTMLElement) {
    const searchQuery = this.searchQuery.toLowerCase();
    const searchQuery2 = this.searchQuery2.toLowerCase();
    const childNodes = Array.from(element.childNodes);

    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];
      if (childNode.nodeType === Node.TEXT_NODE) {
        const text = childNode.textContent?.toLowerCase() || '';
        if (text.includes(searchQuery) || text.includes(searchQuery2)) {
          const span = document.createElement('span');
          span.classList.add('highlighted');
          span.textContent = childNode.textContent;
          element.replaceChild(span, childNode);
        }
      } else if (childNode instanceof HTMLElement) {
        this.processCodeElement(childNode);
      }
    }
  }

  processTextNode(node: HTMLElement, keyword: string) {
    const span = document.createElement('span');
    span.classList.add('highlighted');
    span.textContent = node.textContent;

    const frag = document.createDocumentFragment();
    let lastIdx = 0;
    keyword = keyword.toLowerCase();

    node.textContent!.toLowerCase().split(keyword).forEach((seg, i, { length }) => {
      const kd = document.createTextNode(node.textContent!.substring(lastIdx, lastIdx + seg.length));
      lastIdx += seg.length;

      frag.appendChild(kd);

      if (i !== length - 1) {
        const clone = span.cloneNode();
        clone.textContent = node.textContent!.substr(lastIdx, keyword.length);
        frag.appendChild(clone);
        lastIdx += keyword.length;
      }
    });

    node.replaceWith(frag);
  }

  ngAfterContentInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.changeMarkdownByUrl(url)

      if (!url[1])
        return

      if (url[1].path.includes('?search=')) {
        this.searchQuery = url[1].path.split('?search=')[1].split('&')[0]
        this.searchQuery2 = url[1].path.split('?search=')[1].split('&')[1]
      }
      this.highlightFoundedText()
    })
  }
}
