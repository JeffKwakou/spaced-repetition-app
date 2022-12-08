import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flashcard } from 'src/app/shared/models/Flashcard';
import { ApiService } from 'src/app/shared/services/api.service';
import { FlashcardListComponent } from '../flashcard-list/flashcard-list.component';

@Component({
  selector: 'app-update-flashcard',
  templateUrl: './update-flashcard.component.html',
  styleUrls: ['./update-flashcard.component.scss']
})
export class UpdateFlashcardComponent implements OnInit {
  public currentFlashcard: Flashcard

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {flashcardId: string},
    private apiService: ApiService,
    public dialogRef: MatDialogRef<FlashcardListComponent>
  ) { }

  ngOnInit(): void {
    this.getFlashcard();
  }

  public updateFlashcardForm: FormGroup = this.fb.group({
    front: [ '', [Validators.required]],
    back: [ '', [Validators.required]]
  });

  get front() {
    return this.updateFlashcardForm.get('front');
  }

  get back() {
    return this.updateFlashcardForm.get('back');
  }

  public onSubmitUpdateFlashcard(): void {
    if (!this.updateFlashcardForm.invalid) {
      this.currentFlashcard.front = this.updateFlashcardForm.value.front!
      this.currentFlashcard.back = this.updateFlashcardForm.value.back!

      this.apiService.updateFlashcard(this.currentFlashcard).subscribe(() => {
        this.dialogRef.close();
      })
    }
  }

  private getFlashcard(): void {
    this.apiService.getFlashcard(this.data.flashcardId).subscribe((res: any) => {
      this.currentFlashcard = res.body;
      this.updateFlashcardForm.get(['front'])?.setValue(this.currentFlashcard.front);
      this.updateFlashcardForm.get(['back'])?.setValue(this.currentFlashcard.back);
    })
  }
}
