import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Translate } from 'src/app/shared/tools/translate.tool';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  public signupFormErrorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.signupForm.statusChanges.subscribe(() => {
      this.signupFormErrorMessage = "";
    })
  }

  public signupForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
      confirmPassword: ['', [Validators.required]]
    })
  }, {
    validators: this.authenticationService.controlValuesAreEqual(['passwords', 'password'], ['passwords', 'confirmPassword'])
  })

  // Getters form
  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('passwords')?.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('passwords')?.get('confirmPassword');
  }

  public onSubmitSignupForm(): void {
    if (!this.signupForm.invalid) {
      let formFields = {
        'username': this.signupForm.value.username,
        'email': this.signupForm.value.email,
        'password': this.signupForm.value.passwords?.password
      }

      this.apiService.register(formFields).subscribe({
        next: (res: any) => {
          this.sharedService.openSnackBar(res.body.message, 'OK');
        },
        error: (res: any) => {
          this.signupFormErrorMessage = res.error.message;
          this.sharedService.openSnackBar(res.error.message, 'OK');
        }
      });
    } else {
      this.signupFormErrorMessage = Translate.get('form.error.error');
    }
  }
}
