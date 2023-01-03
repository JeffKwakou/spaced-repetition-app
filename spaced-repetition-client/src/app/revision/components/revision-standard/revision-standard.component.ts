import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from 'src/app/shared/models/Flashcard';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-revision-standard',
  templateUrl: './revision-standard.component.html',
  styleUrls: ['./revision-standard.component.scss']
})
export class RevisionStandardComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.apiService.updateRevisionTypeCount('standard').subscribe();
  }

  public submitResponse(attempt: number): void {
    this.apiService.updateRevisedFlashcard(attempt, this.currentFlashcard).subscribe(() => {
      this.nextCard();
    })
  }

  public flipCard(): void {
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
