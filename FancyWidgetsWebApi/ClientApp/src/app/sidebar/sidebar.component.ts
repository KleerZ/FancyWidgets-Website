import {
  AfterContentInit, AfterViewInit,
  Component,
  ElementRef,
  Input, OnInit, QueryList, ViewChildren,
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DocsModel} from "../../common/models/docsModel";

declare var $: any;

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

  isCollapsed: boolean = false

  @Input()
  categories: string[] = []

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
          value.checked = true
          $(`#${value.parentElement!.parentElement!.parentElement!.parentElement!.id}`).addClass('show')

          document.querySelector('#categories-div')!
            .querySelectorAll('button').forEach(value1 => {
              if (!value1.classList.contains('collapsed'))
                value1!.querySelector('.icon')!.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-caret-down-fill\" viewBox=\"0 0 16 16\">\n" +
                  "  <path d=\"M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/>\n" +
                  "</svg>"
          })
        }
      })
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.checkDefaultLink()
    })
  }

  toggleIcon(id: string) {
    let button = document.getElementById(id)

    if (button!.classList.contains('collapsed')){
      button!.querySelector('.icon')!.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-caret-right-fill\" viewBox=\"0 0 16 16\">\n" +
        "  <path d=\"m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z\"/>\n" +
        "</svg>"
    }
    else {
      button!.querySelector('.icon')!.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-caret-down-fill\" viewBox=\"0 0 16 16\">\n" +
        "  <path d=\"M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/>\n" +
        "</svg>"
    }
  }

}
