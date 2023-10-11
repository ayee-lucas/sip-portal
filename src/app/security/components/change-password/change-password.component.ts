import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  email = '';
  verificationCode = '';
  newPassword = '';
  confirmPassword = '';

  changePassword() {
    if (this.newPassword === this.confirmPassword) {
      // Add password and email when necessary
      console.log('Password changed successfully: ' + this.newPassword);
    } else {
      console.log('Passwords do not match.');
    }
  }
}
