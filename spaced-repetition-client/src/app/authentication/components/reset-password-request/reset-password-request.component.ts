import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Translate } from 'src/app/shared/tools/translate.tool';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {

  formErrorMessage: string;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  onSubmitRecover() {
    if (!this.recoverForm.invalid) {
      let passwordRecover = {
        "email": this.recoverForm.value.email
      };

      this.apiService.passwordRecover(passwordRecover).subscribe((res: any) => {
        this.router.navigate(['/auth/message'], {queryParams: {view: 'emailSended', email: this.recoverForm.value.email}})
      });
    } else {
      this.formErrorMessage = Translate.get('form.error.error');
    }
  }
}
