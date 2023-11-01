import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../testing101/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
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
