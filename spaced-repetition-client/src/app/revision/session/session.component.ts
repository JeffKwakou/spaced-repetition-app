import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from 'src/app/models/Flashcard';
import { Folder } from 'src/app/models/Folder';
import { ApiService } from 'src/app/services/api.service';
import { REVISION_TYPE } from 'src/app/utils/enum/revision';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  folderId: string;
  revisionType: string;
  revisionEnum = REVISION_TYPE;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderid') || '';
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.revisionType = params.type;
    })
  }
  
}
