import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevisionRoutingModule } from './revision-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RevisionQuizComponent } from './components/revision-quiz/revision-quiz.component';
import { RevisionStandardComponent } from './components/revision-standard/revision-standard.component';
import { SessionComponent } from './session.component';
import { RevisionQcmComponent } from './components/revision-qcm/revision-qcm.component';


@NgModule({
  declarations: [
    SessionComponent,
    RevisionStandardComponent,
    RevisionQuizComponent,
    RevisionQcmComponent
  ],
  imports: [
    CommonModule,
    RevisionRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true
    })
  ]
})
export class RevisionModule { }
