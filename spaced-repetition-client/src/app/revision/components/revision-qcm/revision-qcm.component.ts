import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from 'src/app/shared/models/Flashcard';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-revision-qcm',
  templateUrl: './revision-qcm.component.html',
  styleUrls: ['./revision-qcm.component.scss']
})
export class RevisionQcmComponent implements OnInit {
  public folderId: string;
  public flashcards: Flashcard[];
  public revisionIndex: number = 0;
  public currentFlashcard: Flashcard;
  public endOfRevision: boolean = false;
  public attempt: number = 5;
  public isLoading: boolean = false;
  public shuffledDeck: Flashcard[];

  quizForm = this.formBuilder.group({
    response: ['', [Validators.required]]
  })

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.folderId = params.folderId;
      this.getCardToRevise();
    })
  }

  public checkResponse(): void {
    if (this.quizForm.value.response !== this.currentFlashcard.back && this.attempt > 1 ) {
      this.attempt = 0;
      this.updateFlashcard();
    } else {
      this.updateFlashcard();
    }

    this.quizForm.reset();
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
      this.shuffledDeck = [];
      this.dealCards();
      this.revisionIndex++;
    } else {
      this.getCardToRevise();
    }
  }

  private dealCards() {
    this.shuffledDeck = [this.flashcards[this.revisionIndex]];

    let deck = [...this.flashcards];
    deck.splice(this.revisionIndex, 1);

    let count = 0;
    while (count < 3) {
      let randomIndex = Math.floor(Math.random() * deck.length);
      this.shuffledDeck.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
      count++;
    }

    this.shuffledDeck.sort((a, b) => 0.5 - Math.random());
  }

  private updateFlashcard(): void {
    this.apiService.updateRevisedFlashcard(this.attempt, this.currentFlashcard).subscribe((res: any) => {
      this.nextCard()
    })
  }
}
