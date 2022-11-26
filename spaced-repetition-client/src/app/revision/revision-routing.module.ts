import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionQcmComponent } from './revision-qcm/revision-qcm.component';
import { RevisionQuizComponent } from './revision-quiz/revision-quiz.component';
import { RevisionStandardComponent } from './revision-standard/revision-standard.component';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
  {
    path: ':folderId',
    component: SessionComponent,
    children: [
      {
        path: 'standard',
        component: RevisionStandardComponent
      },
      {
        path: 'quiz',
        component: RevisionQuizComponent
      },
      {
        path: 'qcm',
        component: RevisionQcmComponent
      },
      {
        path: 'associe',
        component: RevisionStandardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionRoutingModule { }
