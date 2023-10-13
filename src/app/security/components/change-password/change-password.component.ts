import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordData } from '../../types/change-password-type';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup<ChangePasswordData>;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }
  private buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode:['', Validators.required],
      newPassword: ['', Validators.required],  
      confirmPassword: ['', Validators.required],
    });
  }
  changePassword() {
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword) {
        console.log('Password changed successfully: ' + this.changePasswordForm.value.newPassword);
        // Here you can send the form data to the server or perform other necessary actions.
      } else {
        console.log('Passwords do not match.');
      }
    } else {
      // The form is not valid, you can display error messages or take other actions.
    }
  }
}


