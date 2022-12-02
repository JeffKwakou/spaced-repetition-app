import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlashcardListComponent } from 'src/app/flashcards/components/flashcard-list/flashcard-list.component';
import { Flashcard } from 'src/app/shared/models/Flashcard';
import { ApiService } from 'src/app/shared/services/api.service';
import { REVISION_TYPE } from '../../enum/revision';

@Component({
  templateUrl: './dialog-revison-view.component.html'
})
export class DialogRevisonView {

  public isLoading: boolean = false;
  revisionType = REVISION_TYPE;
  public flashcards: Flashcard[];
  dialogRevisionForm = this.formBuilder.group({
    options: [this.revisionType.standard, []]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, @Inject(MAT_DIALOG_DATA) public data: {folderId: string}, public dialogRef: MatDialogRef<FlashcardListComponent>, private apiService: ApiService) {
    this.apiService.getFlashcardsToRevise(this.data.folderId).subscribe((res: any) => {
      this.flashcards = res.body.flashcards;
      this.isLoading = true;
    })
  }

  launchRevision() {
    this.router.navigate(['revision/' + this.data.folderId + '/' + this.dialogRevisionForm.controls.options.value])
    this.dialogRef.close()
  }

}
