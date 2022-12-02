import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoldersRoutingModule } from './folders-routing.module';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { FolderListComponent } from './components/folder-list/folder-list.component';
import { UpdateFolderComponent } from './components/update-folder/update-folder.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { FoldersComponent } from './folders.component';


@NgModule({
  declarations: [
    AddFolderComponent,
    FolderListComponent,
    UpdateFolderComponent,
    FoldersComponent
  ],
  imports: [
    CommonModule,
    FoldersRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true
    })
  ]
})
export class FoldersModule { }
