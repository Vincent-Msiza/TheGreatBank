import { Component , OnInit } from '@angular/core';
import { AuthService } from 'src/app/testing101/auth.service';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password, ...userInformation } = form.value;
      this.authService.registerUser(email, password, userInformation).then(() => {
        console.log('User registered successfully!');
        form.reset();
      });
    }
  }
}
