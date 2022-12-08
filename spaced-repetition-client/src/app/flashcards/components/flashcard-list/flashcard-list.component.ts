import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from 'src/app/shared/models/Flashcard';
import { ApiService } from 'src/app/shared/services/api.service';
import { DialogRevisonView } from 'src/app/shared/modals/dialog-revison-view/dialog-revison-view.component';
import { AddFlashcardComponent } from '../add-flashcard/add-flashcard.component';
import { UpdateFlashcardComponent } from '../update-flashcard/update-flashcard.component';
import { FilterFlashcardValue } from 'src/app/shared/enum/filters';

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {
  public folderId: string;
  public currentDate: Date = new Date();
  public searchingFlashcard: string;

  public flashcards: Flashcard[];
  private allFlashcards: Flashcard[];

  public filterFlashcardValue = FilterFlashcardValue
  public filterFlashcardBy = FilterFlashcardValue.default

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderid') || '';
    this.getFlashcards();
  }

  public launchNewRevision(): void {
    this.dialog.open(DialogRevisonView, {
      width: '400px',
      data: { folderId: this.folderId },
    });
  }

  public openDialogAddFlashcard(): void {
    const dialogRef = this.dialog.open(AddFlashcardComponent, {
      width: '400px',
      data: { folderId: this.folderId },
    });

    dialogRef.afterClosed().subscribe(() => this.getFlashcards());
  }

  public openDialogUpdateFlashcard(flashcardId: string) {
    const dialogRef = this.dialog.open(UpdateFlashcardComponent, {
      width: '400px',
      data: { flashcardId: flashcardId },
    });

    dialogRef.afterClosed().subscribe(() => this.getFlashcards());
  }

  checkDateFolder(elementDate: Date): boolean {
    let folderDate = new Date(elementDate);
    if (this.currentDate.getFullYear() > folderDate.getFullYear()) {
      return false;
    } else if (this.currentDate.getMonth() > folderDate.getMonth() && this.currentDate.getFullYear() == folderDate.getFullYear()) {
      return false;
    } else if (this.currentDate.getDate() > folderDate.getDate() && this.currentDate.getMonth() == folderDate.getMonth() && this.currentDate.getFullYear() == folderDate.getFullYear()) {
      return false;
    } else if (this.currentDate.getFullYear() == folderDate.getFullYear() && this.currentDate.getMonth() == folderDate.getMonth() && this.currentDate.getDate() == folderDate.getDate()) {
      return false;
    }
    return true;
  }

  public searchFlashcardByKeyword(): void {
    this.flashcards = this.allFlashcards.filter((flashcard) => { return flashcard.front.toLowerCase().indexOf(this.searchingFlashcard.toLowerCase()) != -1 || flashcard.back.toLowerCase().indexOf(this.searchingFlashcard.toLowerCase()) != -1 });
  }

  public onFilterFlashcards(filterValue: string): void {
    switch (filterValue) {
      case 'default':
        this.filterFlashcardBy = FilterFlashcardValue.default;
        this.getFlashcards();
        break
      case 'lastadd':
        this.filterFlashcardBy = FilterFlashcardValue.lastadd;
        this.flashcards = this.flashcards.reverse();
        break
      case 'front':
        this.filterFlashcardBy = FilterFlashcardValue.front;
        this.flashcards.sort(function(a, b){
          if(a.front.toLowerCase() < b.front.toLowerCase()) { return -1; }
          if(a.front.toLowerCase() > b.front.toLowerCase()) { return 1; }
          return 0;
        });
        break
      case 'back':
        this.filterFlashcardBy = FilterFlashcardValue.back;
        this.flashcards.sort(function(a, b){
          if(a.back.toLowerCase() < b.back.toLowerCase()) { return -1; }
          if(a.back.toLowerCase() > b.back.toLowerCase()) { return 1; }
          return 0;
        });
        break
      case 'revisiondate':
        this.filterFlashcardBy = FilterFlashcardValue.revisiondate;
        this.flashcards.sort(function(a, b){
          if(a.date_revision < b.date_revision) { return -1; }
          if(a.date_revision > b.date_revision) { return 1; }
          return 0;
        });
        break
      default :
        this.filterFlashcardBy = FilterFlashcardValue.default;
        this.getFlashcards();
    }
  }

  public deleteFlashcard(flashcardId: string): void {
    this.apiService.deleteFlashcard(flashcardId).subscribe(() => {
      this.getFlashcards();
    })
  }

  private getFlashcards(): void {
    this.apiService.getAllFlashcards(this.folderId).subscribe((res: any) => {
      this.flashcards = res.body
      this.allFlashcards = this.flashcards
    })
  }

}
