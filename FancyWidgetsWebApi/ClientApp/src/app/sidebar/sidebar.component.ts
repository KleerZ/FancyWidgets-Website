import {
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  @Input()
  public showSidebar: boolean = false

  constructor(private elementRef: ElementRef, private router: Router) {

  }
}
