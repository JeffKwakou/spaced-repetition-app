import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DialogRevisonView } from './modals/dialog-revison-view/dialog-revison-view.component';
import { MaterialModule } from './modules/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    DialogRevisonView
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  exports: [
    HeaderComponent,
    DialogRevisonView,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
