import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {

  viewName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewName = this.route.snapshot.queryParamMap.get('view') || '';
  }

  displayView() {
    if (this.viewName == 'emailSended') {
      return true;
    } else if (this.viewName == 'passwordReseted') {
      return true;
    } else {
      return false;
    }
  }
}
