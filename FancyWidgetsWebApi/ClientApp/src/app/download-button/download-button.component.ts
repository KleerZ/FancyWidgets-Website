import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.sass']
})
export class DownloadButtonComponent {

  @Input()
  public url: string = ""

  sendDownloadAnalyticsData() {
    gtag('event', 'download');
  }
}
