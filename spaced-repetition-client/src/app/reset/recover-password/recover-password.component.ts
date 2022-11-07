import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Translate } from 'src/app/utils/tools/translate.tool';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
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
        this.router.navigate(['/forgot/password'], {queryParams: {view: 'emailSended', email: this.recoverForm.value.email}})
      });
    } else {
      this.formErrorMessage = Translate.get('form.error.error');
    }
  }

}
