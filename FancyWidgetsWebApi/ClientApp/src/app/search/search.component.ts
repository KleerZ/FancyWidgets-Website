import {Component, ElementRef, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {marked} from "marked";
import {Docs} from "../../docs/docs";
import {ActivatedRoute, Router} from "@angular/router";
import {DocsModel} from "../../common/models/docsModel";

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  @Input()
  public searchData: DocsModel[] = []

  showSearchPanel: boolean = false

  searchQuery: string = ""
  searchResults: any[] = []

  search() {
    if (this.searchQuery === "") {
      this.searchResults = []
    }

    this.searchResults = []

    this.searchData.forEach(value => {
      this.searchInMarkdown(value.text, `/docs/${value.routerUrl}`, value.title)
    })
  }

  clearSearchInput() {
    this.searchQuery = ''
    this.searchResults = []
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

  closeModal() {
    $('#searchModal').modal('hide');
  }
}
