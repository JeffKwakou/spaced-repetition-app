import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { FlashcardListComponent } from '../flashcard-list/flashcard-list.component';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.scss']
})
export class AddFlashcardComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {folderId: string},
    private apiService: ApiService,
    public dialogRef: MatDialogRef<FlashcardListComponent>
  ) { }

  ngOnInit(): void {
  }

  public addFlashcardForm: FormGroup = this.fb.group({
    front: ['', [Validators.required]],
    back: ['', [Validators.required]]
  });

  get front() {
    return this.addFlashcardForm.get('front');
  }

  get back() {
    return this.addFlashcardForm.get('back');
  }

  public onSubmitAddFlashcard(): void {
    if(!this.addFlashcardForm.invalid) {
      this.apiService.addFlashcard(this.data.folderId, this.addFlashcardForm.value).subscribe(() => {
        this.addFlashcardForm.reset()
        this.dialogRef.close();
      });
    }
  }
}
