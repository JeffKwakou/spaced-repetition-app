import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flashcard } from '../models/Flashcard';
import { Folder } from '../models/Folder';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  APIURL: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  // ---------------------------------------------
  // AUTHENTICATION ROUTES
  // ---------------------------------------------
  signup(formFields: object) {
    return this.http.post(this.APIURL + "/auth/register", formFields, { observe: 'response' });
  }

  login(formFields:object) {
    return this.http.post(this.APIURL + "/auth/login", formFields, { observe: 'response' });
  }

  // Recover password request
  passwordRecover(userEmailRecover: object) {
    return this.http.post(this.APIURL + '/auth/recover', userEmailRecover, {observe: 'response'});
  }

  // Reset password request
  resetPassword(newPassword: object, token: string) {
    return this.http.post(this.APIURL + '/auth/reset/' + token, newPassword, {observe: 'response'})
  }

  // ---------------------------------------------
  // FOLDER ROUTES
  // ---------------------------------------------
  addFolder(newFolder: object) {
    return this.http.post(this.APIURL + '/folder/add', newFolder, { observe: 'response' });
  }

  getFolders() {
    return this.http.get(this.APIURL + '/folder/all', {observe: 'response'});
  }

  getOneFolder(folderId: string) {
    return this.http.get(this.APIURL + '/folder/' + folderId, { observe: 'response' })
  }

  deleteFolder(folderId: string) {
    return this.http.delete(this.APIURL + '/folder/' + folderId, { observe: 'response' })
  }

  updateFolder(updateFolder: Folder) {
    return this.http.put(this.APIURL + '/folder/' + updateFolder._id, updateFolder, { observe: 'response' })
  }

  // ---------------------------------------------
  // FLASHCARD ROUTES
  // ---------------------------------------------
  addFlashcard(folderId: string, newFlashcard: object) {
    return this.http.post(this.APIURL + '/flashcard/add/' + folderId, newFlashcard, { observe: 'response' })
  }

  getAllFlashcards(folderId: string) {
    return this.http.get(this.APIURL + '/flashcard/all/' + folderId, {observe: 'response'})
  }

  getFlashcard(flashcardId: string) {
    return this.http.get(this.APIURL + '/flashcard/' + flashcardId, {observe: 'response'})
  }

  updateFlashcard(flashcard: Flashcard) {
    return this.http.patch(this.APIURL + '/flashcard/' + flashcard._id, flashcard, {observe: 'response'})
  }

  deleteFlashcard(flashcardId: string) {
    return this.http.delete(this.APIURL + '/flashcard/' + flashcardId, {observe: 'response'})
  }

  // ---------------------------------------------
  // REVISION ROUTES
  // ---------------------------------------------
  getFlashcardsToRevise(folderId: string) {
    return this.http.get(this.APIURL + '/revision/getflashcards/' + folderId, {observe: 'response'})
  }

  updateRevisedFlashcard(attempt: number, revisedFlashcard: Flashcard) {
    let updateFlashcard = {
      'flashcard': revisedFlashcard,
      'attempt': attempt
    }
    return this.http.put(this.APIURL + '/revision/updateflashcard/', updateFlashcard, {observe: 'response'})
  }
}
