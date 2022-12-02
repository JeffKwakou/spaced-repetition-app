import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from 'src/app/shared/models/Flashcard';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-revision-quiz',
  templateUrl: './revision-quiz.component.html',
  styleUrls: ['./revision-quiz.component.scss']
})
export class RevisionQuizComponent implements OnInit {
  public folderId: string;
  public flashcards: Flashcard[];
  public revisionIndex: number = 0;
  public currentFlashcard: Flashcard;
  public endOfRevision: boolean = false;
  public attempt: number = 5;
  public isLoading: boolean = false;

  quizForm = this.formBuilder.group({
    response: ['', [Validators.required]]
  })

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.folderId = params.folderId;
      this.getCardToRevise();
    });
  }

  public checkResponse(): void {
    if (this.quizForm.value.response !== this.currentFlashcard.back && this.attempt > 1 ) {
    this.attempt--;
    this.quizForm.reset();
    } else {
      this.updateFlashcard();
    }
  }

  private getCardToRevise(): void {
    this.apiService.getFlashcardsToRevise(this.folderId).subscribe((res: any) => {
      this.flashcards = res.body.flashcards;

      if (this.flashcards.length == 0) {
        this.endOfRevision = true;
      } else {
        this.revisionIndex = 0;
        this.nextCard();
        this.isLoading = true;
      }
    })
  }

  private nextCard(): void {
    if (this.revisionIndex < this.flashcards.length) {
      this.attempt = 5;
      this.currentFlashcard = this.flashcards[this.revisionIndex];
      this.revisionIndex++;
    } else {
      this.getCardToRevise();
    }
  }

  private updateFlashcard(): void {
    this.apiService.updateRevisedFlashcard(this.attempt, this.currentFlashcard).subscribe((res: any) => {
      this.nextCard()
    })
  }

}
