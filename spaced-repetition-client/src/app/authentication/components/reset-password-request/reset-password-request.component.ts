import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Translate } from 'src/app/shared/tools/translate.tool';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {
  public formErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public recoverForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get email() {
    return this.recoverForm.get('email');
  }

  public onSubmitRecover(): void {
    if (!this.recoverForm.invalid) {
      this.apiService.passwordRecover(this.recoverForm.value).subscribe(() => {
        this.router.navigate(['/auth/message'], {queryParams: {view: 'emailSended', email: this.recoverForm.value.email}});
      });
    } else {
      this.formErrorMessage = Translate.get('form.error.error');
    }
  }
}
