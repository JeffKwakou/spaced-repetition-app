import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flashcard } from '../models/Flashcard';
import { Folder } from 'src/app/shared/models/Folder';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  APIURL: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  // ---------------------------------------------
  // AUTHENTICATION ROUTES
  // ---------------------------------------------
  public register(formFields: object) {
    return this.http.post(this.APIURL + "/auth/register", formFields, { observe: 'response' });
  }

  public login(formFields:object) {
    return this.http.post(this.APIURL + "/auth/login", formFields, { observe: 'response' });
  }

  // Recover password request
  public passwordRecover(userEmailRecover: object) {
    return this.http.post(this.APIURL + '/auth/recover', userEmailRecover, {observe: 'response'});
  }

  // Reset password request
  public resetPassword(newPassword: object, token: string) {
    return this.http.post(this.APIURL + '/auth/reset/' + token, newPassword, {observe: 'response'});
  }

  // ---------------------------------------------
  // FOLDER ROUTES
  // ---------------------------------------------
  public addFolder(newFolder: object) {
    return this.http.post(this.APIURL + '/folder/add', newFolder, { observe: 'response' });
  }

  public getFolders() {
    return this.http.get(this.APIURL + '/folder/all', {observe: 'response'});
  }

  public getOneFolder(folderId: string) {
    return this.http.get(this.APIURL + '/folder/' + folderId, { observe: 'response' });
  }

  public deleteFolder(folderId: string) {
    return this.http.delete(this.APIURL + '/folder/' + folderId, { observe: 'response' });
  }

  public updateFolder(updateFolder: Folder) {
    return this.http.put(this.APIURL + '/folder/' + updateFolder._id, updateFolder, { observe: 'response' });
  }

  // ---------------------------------------------
  // FLASHCARD ROUTES
  // ---------------------------------------------
  public addFlashcard(folderId: string, newFlashcard: object) {
    return this.http.post(this.APIURL + '/flashcard/add/' + folderId, newFlashcard, { observe: 'response' });
  }

  public getAllFlashcards(folderId: string) {
    return this.http.get(this.APIURL + '/flashcard/all/' + folderId, {observe: 'response'});
  }

  public getFlashcard(flashcardId: string) {
    return this.http.get(this.APIURL + '/flashcard/' + flashcardId, {observe: 'response'});
  }

  public updateFlashcard(flashcard: Flashcard) {
    return this.http.patch(this.APIURL + '/flashcard/' + flashcard._id, flashcard, {observe: 'response'});
  }

  public deleteFlashcard(flashcardId: string) {
    return this.http.delete(this.APIURL + '/flashcard/' + flashcardId, {observe: 'response'});
  }

  // ---------------------------------------------
  // REVISION ROUTES
  // ---------------------------------------------
  public getFlashcardsToRevise(folderId: string) {
    return this.http.get(this.APIURL + '/revision/getflashcards/' + folderId, {observe: 'response'});
  }

  public updateRevisedFlashcard(attempt: number, revisedFlashcard: Flashcard) {
    let updateFlashcard = {
      'flashcard': revisedFlashcard,
      'attempt': attempt
    }
    return this.http.put(this.APIURL + '/revision/updateflashcard/', updateFlashcard, {observe: 'response'});
  }


  public updateRevisionTypeCount(revisionType: string) {
    let revisionTypeToUpdate = {
      'revisionType': revisionType
    }
    return this.http.put(this.APIURL + '/revision/update-revision-type-count/', revisionTypeToUpdate, {observe: 'response'});
  }

  // ---------------------------------------------
  // DASHBOARD CHARTS ROUTES
  // ---------------------------------------------
  public getDistributionCardByFolder() {
    return this.http.get(this.APIURL + '/dashboard/distribution-card-by-folder', {observe: 'response'});
  }

  public getRevisionTypePercentage() {
    return this.http.get(this.APIURL + '/dashboard/revision-count', {observe: 'response'});
  }

  public getAnswerPercentage() {
    return this.http.get(this.APIURL + '/dashboard/answer-count', {observe: 'response'});
  }
}
