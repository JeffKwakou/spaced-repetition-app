import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.scss']
})
export class AddFlashcardComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {folderId: string}, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addFlashcardForm = this.fb.group({
    front: ['', [Validators.required]],
    back: ['', [Validators.required]],
    note: ['']
  })

  onSubmitAddFlashcard() {
    if(!this.addFlashcardForm.invalid) {
      let newFlashcard = {
        'front': this.addFlashcardForm.value.front,
        'back': this.addFlashcardForm.value.back,
        'info_sup': this.addFlashcardForm.value.note
      }

      this.apiService.addFlashcard(this.data.folderId, newFlashcard).subscribe((res:any) => {
        console.log(res)
      })
    }
  }
}
