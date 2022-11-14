import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlashcardListComponent } from 'src/app/flashcards/flashcard-list/flashcard-list.component';
import { REVISION_TYPE } from '../../enum/revision';

@Component({
  templateUrl: './dialog-revison-view.component.html'
})
export class DialogRevisonView {

  revisionType = REVISION_TYPE;
  dialogRevisionForm = this.formBuilder.group({
    options: [this.revisionType.standard, []]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, @Inject(MAT_DIALOG_DATA) public data: {folderId: string}, public dialogRef: MatDialogRef<FlashcardListComponent>) { }

  launchRevision() {
    this.router.navigate(['revision', this.data.folderId], { queryParams: { type: this.dialogRevisionForm.controls.options.value } })
    this.dialogRef.close()
  }

}
