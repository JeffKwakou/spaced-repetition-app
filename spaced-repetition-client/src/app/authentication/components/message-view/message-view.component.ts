import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {

  public viewName: string;
  public viewEmail: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewName = this.route.snapshot.queryParamMap.get('view') || '';
    this.viewEmail = this.route.snapshot.queryParamMap.get('email') || '';
  }

  public displayViewEmail(): boolean {
    if (this.viewName == 'emailSended') {
      return true;
    }

    return false;
  }

  public displayViewPassword(): boolean {
    if (this.viewName == 'passwordReseted') {
      return true;
    }

    return false;
  }
}
