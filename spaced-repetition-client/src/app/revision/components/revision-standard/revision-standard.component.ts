import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { Flashcard } from 'src/app/shared/models/Flashcard';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-revision-standard',
  templateUrl: './revision-standard.component.html',
  styleUrls: ['./revision-standard.component.scss']
})
export class RevisionStandardComponent implements OnInit {
  public folderId: string;
  public flashcards: Flashcard[];
  public revisionIndex: number = 0;
  public currentFlashcard: Flashcard;
  public endOfRevision: boolean = false;
  public isLoading: boolean = false;

  @ViewChild('revisionCard') revisionCardElement: ElementRef;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.folderId = params.folderId;
      this.getCardToRevise();
    });
  }

  public submitResponse(attempt: number) {
    this.apiService.updateRevisedFlashcard(attempt, this.currentFlashcard).subscribe((res: any) => {
      this.nextCard()
    })
  }

  public flipCard() {
    if (this.revisionCardElement.nativeElement.classList.contains('active')) {
      this.revisionCardElement.nativeElement.classList.remove('active')
    } else {
      this.revisionCardElement.nativeElement.classList.add('active')
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
      this.currentFlashcard = this.flashcards[this.revisionIndex];
      this.revisionIndex++;
    } else {
      this.getCardToRevise();
    }
  }
}
