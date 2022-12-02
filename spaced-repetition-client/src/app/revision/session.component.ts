import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  public folderId: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId') || '';
  }

}
