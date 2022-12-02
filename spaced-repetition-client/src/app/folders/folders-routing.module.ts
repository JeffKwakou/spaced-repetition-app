import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderListComponent } from './components/folder-list/folder-list.component';

const routes: Routes = [
  {
    path: '',
    component: FolderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoldersRoutingModule { }
