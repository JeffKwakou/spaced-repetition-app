import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from 'src/app/models/Flashcard';
import { ApiService } from 'src/app/services/api.service';
import { DialogRevisonView } from 'src/app/utils/views/dialog-revison-view/dialog-revison-view.component';
import { AddFlashcardComponent } from '../add-flashcard/add-flashcard.component';
import { UpdateFlashcardComponent } from '../update-flashcard/update-flashcard.component';

export enum FilterFlashcardValue {
  default,
  front,
  back,
  lastadd,
  revisiondate
}

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {

  folderId: string;

  flashcards: Flashcard[];
  allFlashcards: Flashcard[];

  currentDate: Date = new Date();

  searchingFlashcard: string;

  filterFlashcardValue = FilterFlashcardValue
  filterFlashcardBy = FilterFlashcardValue.default

  constructor(private dialog: MatDialog, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderid') || '';
    this.getFlashcards()
  }

  launchNewRevision(): void {
    this.dialog.open(DialogRevisonView, {
      width: '400px',
      data: { folderId: this.folderId },
    });
  }

  getFlashcards(): void {
    this.apiService.getAllFlashcards(this.folderId).subscribe((res: any) => {
      this.flashcards = res.body
      this.allFlashcards = this.flashcards
    })
  }

  openDialogAddFlashcard(): void {
    const dialogRef = this.dialog.open(AddFlashcardComponent, {
      width: '400px',
      data: { folderId: this.folderId },
    });

    dialogRef.afterClosed().subscribe(() => this.getFlashcards());
  }

  openDialogUpdateFlashcard(flashcardId: string) {
    const dialogRef = this.dialog.open(UpdateFlashcardComponent, {
      width: '400px',
      data: { flashcardId: flashcardId },
    });

    dialogRef.afterClosed().subscribe(() => this.getFlashcards());
  }

  checkDateFolder(elementDate: Date): boolean {
    let folderDate = new Date(elementDate)
    if (this.currentDate.getFullYear() > folderDate.getFullYear()) {
      return false;
    } else if (this.currentDate.getMonth() > folderDate.getMonth() && this.currentDate.getFullYear() == folderDate.getFullYear()) {
      return false;
    } else if (this.currentDate.getDate() > folderDate.getDate() && this.currentDate.getMonth() == folderDate.getMonth() && this.currentDate.getFullYear() == folderDate.getFullYear()) {
      return false;
    } else if (this.currentDate.getFullYear() == folderDate.getFullYear() && this.currentDate.getMonth() == folderDate.getMonth() && this.currentDate.getDate() == folderDate.getDate()) {
      return false;
    }
    return true
  }

  searchFlashcardByKeyword() {
    this.flashcards = this.allFlashcards.filter((flashcard) => { return flashcard.front.toLowerCase().indexOf(this.searchingFlashcard.toLowerCase()) != -1 || flashcard.back.toLowerCase().indexOf(this.searchingFlashcard.toLowerCase()) != -1 });
  }

  onFilterFlashcards(filterValue: string) {
    switch (filterValue) {
      case 'default':
        this.filterFlashcardBy = FilterFlashcardValue.default
        this.getFlashcards()
        break
      case 'lastadd':
        this.filterFlashcardBy = FilterFlashcardValue.lastadd
        this.flashcards = this.flashcards.reverse();
        break
      case 'front':
        this.filterFlashcardBy = FilterFlashcardValue.front
        this.flashcards.sort(function(a, b){
          if(a.front.toLowerCase() < b.front.toLowerCase()) { return -1; }
          if(a.front.toLowerCase() > b.front.toLowerCase()) { return 1; }
          return 0;
        });
        break
      case 'back':
        this.filterFlashcardBy = FilterFlashcardValue.back
        this.flashcards.sort(function(a, b){
          if(a.back.toLowerCase() < b.back.toLowerCase()) { return -1; }
          if(a.back.toLowerCase() > b.back.toLowerCase()) { return 1; }
          return 0;
        });
        break
      case 'revisiondate':
        this.filterFlashcardBy = FilterFlashcardValue.revisiondate
        this.flashcards.sort(function(a, b){
          if(a.date_revision < b.date_revision) { return -1; }
          if(a.date_revision > b.date_revision) { return 1; }
          return 0;
        });
        break
      default :
        this.filterFlashcardBy = FilterFlashcardValue.default
        this.getFlashcards()
    }
  }

  deleteFlashcard(flashcardId: string) {
    this.apiService.deleteFlashcard(flashcardId).subscribe((res: any) => {
      this.getFlashcards();
    })
  }

}
