import {
  AfterContentInit, AfterViewInit,
  Component,
  ElementRef,
  Input, OnInit, QueryList, ViewChildren,
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DocsModel} from "../../common/models/docsModel";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements AfterViewInit, OnInit {
  @Input()
  public showSidebar: boolean = false

  @Input()
  public docsArticles: DocsModel[] = []

  @Input()
  isLoaded: boolean = false

  @ViewChildren('items') items!: QueryList<ElementRef>;

  constructor(private elementRef: ElementRef, private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.items.changes.subscribe(() => {
      if (this.items.length === this.items.toArray().filter(item => item.nativeElement.textContent).length) {
        this.checkDefaultLink();
      }
    });
  }

  checkDefaultLink() {
    document.querySelectorAll('input')
      .forEach((value, key) => {
        if (value.value === this.router.url.replace('/docs/', '').split('%')[0]) {
          console.log(value)
          value.checked = true
        }
      })
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.checkDefaultLink()
    })
  }

}
