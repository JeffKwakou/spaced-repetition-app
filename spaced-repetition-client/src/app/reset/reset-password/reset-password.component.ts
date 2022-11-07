import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Translate } from 'src/app/utils/tools/translate.tool';

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
      this.formErrorMessage = Translate.get('form.error.error');
    }
  }
}
