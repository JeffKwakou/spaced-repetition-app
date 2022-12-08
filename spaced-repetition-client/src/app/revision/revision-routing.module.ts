import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionQcmComponent } from './components/revision-qcm/revision-qcm.component';
import { RevisionQuizComponent } from './components/revision-quiz/revision-quiz.component';
import { RevisionStandardComponent } from './components/revision-standard/revision-standard.component';
import { SessionComponent } from './session.component';

const routes: Routes = [
  {
    path: ':folderId',
    component: SessionComponent,
    children: [
      {
        path: 'standard',
        component: RevisionStandardComponent,
        title: 'Standard revision | RepeatAgain'
      },
      {
        path: 'quiz',
        component: RevisionQuizComponent,
        title: 'Quiz revision | RepeatAgain'
      },
      {
        path: 'qcm',
        component: RevisionQcmComponent,
        title: 'MCQ revision | RepeatAgain'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionRoutingModule { }
