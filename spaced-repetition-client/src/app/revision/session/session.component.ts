import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from 'src/app/models/Flashcard';
import { Folder } from 'src/app/models/Folder';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  folderId: string;

  flashcards: Flashcard[];
  currentFolder: Folder;
  currentFlashcard: Flashcard

  index: number = 0

  quizResponse: string;

  quizAttempt: number = 5;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderid') || '';
    this.getFlashcardToReview();
    this.getCurrentFolder()
  }

  quizForm = this.fb.group({
    response: ['']
  })

  onSubmitResponseQuiz() {
    let response = this.quizForm.value.response

    if (this.currentFlashcard.back.trim().toLowerCase() == response?.trim().toLocaleLowerCase() || this.quizAttempt == 1) {
      this.quizAttempt = 5
      this.responseRepetition(this.quizAttempt)
      this.quizForm.reset()
    } else {
      this.quizForm.reset()
      this.quizAttempt--
    }
  }

  getFlashcardToReview() {
    this.apiService.getFlashcardsToRevise(this.folderId).subscribe((res: any) => {
      this.flashcards = res.body.flashcards
      this.currentFlashcard = this.flashcards[this.index]
    })
  }

  getCurrentFolder() {
    this.apiService.getOneFolder(this.folderId).subscribe((res: any) => {
      this.currentFolder = res.body
    })
  }

  responseRepetition(attempt: number) {
    this.apiService.updateRevisedFlashcard(attempt, this.currentFlashcard).subscribe((res :any) => {
      if (this.index < this.flashcards.length-1) {
        this.index++
        this.currentFlashcard = this.flashcards[this.index]
      } else {
        window.location.reload()
      }
    })
  }

  /**
   * Method conditional
   */
  // Repetition finished
  repetitionIsOver( ) {
    if (this.flashcards.length == 0) {
      return true
    }
    return false
  }

  typeRepetitionStandard() {
    if (this.currentFolder.type_repetition == 'standard') {
      return true
    }
    return false
  }

  typeRepetitionQuiz() {
    if (this.currentFolder.type_repetition == 'quiz') {
      return true
    }
    return false
  }
}
