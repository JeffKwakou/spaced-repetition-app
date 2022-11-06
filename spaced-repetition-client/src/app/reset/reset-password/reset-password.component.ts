import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hidePassword = true
  hideConfirmPassword = true

  tokenParam?: string
  formErrorMessage: string;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.tokenParam = this.activatedRoute.snapshot.paramMap.get('token') || undefined;

    if (this.tokenParam == undefined) {
      this.router.navigate(['/auth'])
    }
  }

  resetForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
      confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.authenticationService.controlValuesAreEqual(['password'], ['confirmPassword'])
  })

  getPasswordErrorMessage(): string {
    if (this.resetForm.get(['password'])?.hasError('required')) {
      return 'Le mot de passe est requis';
    }

    if (this.resetForm.get(['password'])?.hasError('minlength')) {
      return 'Le pseudo doit contenir au minimum 6 caractères';
    }

    return this.resetForm.get(['password'])?.hasError('pattern') ? 'Le pseudo doit contenir au minimum : 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial' : '';
  }
  
  onSubmitReset() {
    if (!this.resetForm.invalid) {
      let newPassword = {
        'password': this.resetForm.value.password,
        'confirmPassword': this.resetForm.value.confirmPassword
      }

      this.apiService.resetPassword(newPassword, this.tokenParam!).subscribe((res) => {
        this.router.navigate(['/forgot/password'], {queryParams: { view: 'passwordReseted' }})
      },
      (error: any) => {
        console.log(error)
        this.formErrorMessage = error.error.message;
      })
    } else {
      this.formErrorMessage = "Veuillez corriger les erreurs du formulaire";
    }
  }
}
