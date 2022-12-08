import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Translate } from 'src/app/shared/tools/translate.tool';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public hidePassword = true;
  public hideConfirmPassword = true;
  public tokenParam?: string
  public formErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.tokenParam = this.activatedRoute.snapshot.paramMap.get('token') || undefined;

    if (this.tokenParam == undefined) {
      this.router.navigate(['/auth']);
    }
  }

  public resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.authenticationService.controlValuesAreEqual(['password'], ['confirmPassword'])
  })

  get password() {
    return this.resetForm.get('password');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  public onSubmitReset(): void {
    if (!this.resetForm.invalid) {
      this.apiService.resetPassword(this.resetForm.value, this.tokenParam!).subscribe({
        next: () => {
          this.router.navigate(['/auth/message'], {queryParams: { view: 'passwordReseted' }});
        },
        error: (res: any) => {
          this.formErrorMessage = res.error.message;
        }
      });
    } else {
      this.formErrorMessage = Translate.get('form.error.error');
    }
  }
}
