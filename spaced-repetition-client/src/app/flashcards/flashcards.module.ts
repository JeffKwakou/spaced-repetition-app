import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { FlashcardsComponent } from './flashcards.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';
import { AddFlashcardComponent } from './components/add-flashcard/add-flashcard.component';
import { UpdateFlashcardComponent } from './components/update-flashcard/update-flashcard.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FlashcardsComponent,
    FlashcardListComponent,
    AddFlashcardComponent,
    UpdateFlashcardComponent
  ],
  imports: [
    CommonModule,
    FlashcardsRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true
    })
  ]
})
export class FlashcardsModule { }
