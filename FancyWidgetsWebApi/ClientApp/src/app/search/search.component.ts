import {Component, ElementRef, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {marked} from "marked";
import {Docs} from "../../docs/docs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  showSearchPanel: boolean = false

  searchQuery: string = ""
  searchResults: any[] = []

  search() {
    if (this.searchQuery === "") {
      this.searchResults = []
    }

    this.searchResults = []

    this.searchInMarkdown(Docs.gettingStarted, '/docs/getting-started', 'Getting Started')
    this.searchInMarkdown(Docs.contextMenu, '/docs/context-menu', "Context Menu")
    this.searchInMarkdown(Docs.settings, '/docs/settings', 'Settings')
    this.searchInMarkdown(Docs.components, '/docs/components', 'Components')
    this.searchInMarkdown(Docs.settingsProvider, '/docs/settings-provider', 'Settings Provider')
    this.searchInMarkdown(Docs.di, '/docs/dependency-injection', "Dependency Injection")
  }

  clearSearchInput() {
    this.searchQuery = ''
  }

  searchInMarkdown(markdown: string, url: string, title: string) {
    const regex = /<code>(.*?)<\/code>/gs;
    let match;

    while ((match = regex.exec(marked.parse(markdown))) !== null) {
      const codeText = match[1];
      if (codeText.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        const searchResult = {text: codeText, url: `${url}?search=${this.searchQuery}&${codeText}`, title: title};
        this.searchResults.push(searchResult);
        this.searchResults = this.searchResults.filter((result, index, self) =>
          index === self.findIndex((r) => r.title === result.title)
        )
      }
    }
  }
}
