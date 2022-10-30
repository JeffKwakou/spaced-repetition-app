import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  signupFormErrorMessage: string = "";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private snackBar: MatSnackBar, private apiService: ApiService) { }

  ngOnInit(): void {
    this.signupForm.statusChanges.subscribe(result => {
      this.signupFormErrorMessage = "";
    })
  }

  // INIT SIGNUP FORM
  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]*$')]],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
      confirmPassword: ['', [Validators.required]]
    })
  }, {
    validators: this.authenticationService.controlValuesAreEqual(['passwords', 'password'], ['passwords', 'confirmPassword'])
  })

  // SUBMIT FORM
  onSubmitSignupForm() {
    if (!this.signupForm.invalid) {
      let formFields = {
        'username': this.signupForm.value.username,
        'email': this.signupForm.value.email,
        'password': this.signupForm.value.passwords?.password
      }

      this.apiService.register(formFields).subscribe((res: any) => {
        this.snackBar.open(res.body.message, 'OK', {
          duration: 5000
        })
      },
      (res: any) => {
        console.log("ici")
        this.signupFormErrorMessage = res.error.message
        this.snackBar.open(res.error.message, 'OK', {
          duration: 5000
        })
      })
    } else {
      this.signupFormErrorMessage = "Veuillez corriger les erreurs du formulaire"
    }
  }
}
