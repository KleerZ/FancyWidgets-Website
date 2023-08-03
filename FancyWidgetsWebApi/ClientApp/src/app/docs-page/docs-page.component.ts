import {
  Component,
  ElementRef, OnInit, ViewChild
} from '@angular/core';
import {Docs} from "../../docs/docs";
import {ActivatedRoute, Router} from "@angular/router";
import {DocsService} from "../../common/services/docs.service";
import {DocsModel} from "../../common/models/docsModel";

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.sass']
})
export class DocsPageComponent implements OnInit {

  isLoaded: boolean = false

  docsArticles: DocsModel[] = []
  categories: string[] = []
  protected readonly Docs = Docs;
  showSidebar = true;
  markdownText: string = Docs.welcome;

  @ViewChild('markdown', {static: true, read: ElementRef}) markdownElement!: ElementRef<HTMLElement>;
  @ViewChild('sidebarComponent') sidebarComponent!: ElementRef<HTMLElement>

  searchQuery: string = ""
  searchQuery2: string = ""
  searchResults: any[] = []
  currentUrl: string = ''

  constructor(private activatedRoute: ActivatedRoute,
              private docsService: DocsService,
              private router : Router) {
    if (window.innerWidth < 768)
      this.showSidebar = false
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  AfterInit(): void {
    this.activatedRoute.url.subscribe(url => {
      if (!url[1])
        return

      if (url[1].path.split('?')[0] === 'welcome' || url[1].path === 'welcome') {
        this.markdownText = Docs.welcome
        return;
      }

      this.searchQuery = ''
      this.searchQuery2 = ''

      this.changeMarkdown(this.router.url.replace('/docs/', '').split('%')[0])

      if (url[1].path.includes('?search=')) {
        this.searchQuery = url[1].path.split('?search=')[1].split('&')[0]
        this.searchQuery2 = url[1].path.split('?search=')[1].split('&')[1]
        this.highlightFoundedText()
      }
    })
  }

  changeMarkdown(url: string) {
    if (!url)
      return
    this.markdownText = this.docsArticles.filter(value => value.routerUrl === url)[0]?.text
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

    node.textContent!.toLowerCase().split(keyword).forEach((seg, i, {length}) => {
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

  ngOnInit(): void {
    this.docsService.getAll()
      .subscribe(value => {
        this.docsArticles = value.sort(value => value.id)
        this.categories = [...new Set(this.docsArticles.map(d => d.category))]
        this.isLoaded = true
        this.changeMarkdown(this.router.url.replace('/docs/', '').split('%')[0]);
        this.AfterInit()
      })
  }

  protected readonly queueMicrotask = queueMicrotask;
}
