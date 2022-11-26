import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/modules/material.module';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FolderListComponent } from './folders/folder-list/folder-list.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { RecoverPasswordComponent } from './reset/recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset/reset-password/reset-password.component';
import { HeaderComponent } from './utils/components/header/header.component';
import { AddFolderComponent } from './folders/add-folder/add-folder.component';
import { UpdateFolderComponent } from './folders/update-folder/update-folder.component';
import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { AddFlashcardComponent } from './flashcards/add-flashcard/add-flashcard.component';
import { UpdateFlashcardComponent } from './flashcards/update-flashcard/update-flashcard.component';
import { SessionComponent } from './revision/session/session.component';
import { MessageViewComponent } from './reset/message-view/message-view.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { setAppInjector } from './app.injector';
import { RevisionStandardComponent } from './revision/revision-standard/revision-standard.component';
import { RevisionQuizComponent } from './revision/revision-quiz/revision-quiz.component';
import { DialogRevisonView } from './utils/views/dialog-revison-view/dialog-revison-view.component';
import { RevisionQcmComponent } from './revision/revision-qcm/revision-qcm.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FolderListComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
    HeaderComponent,
    AddFolderComponent,
    UpdateFolderComponent,
    FlashcardListComponent,
    AddFlashcardComponent,
    UpdateFlashcardComponent,
    SessionComponent,
    MessageViewComponent,
    RevisionStandardComponent,
    RevisionQuizComponent,
    DialogRevisonView,
    RevisionQcmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
    })
  ],
  providers: [
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector)
  }
}
