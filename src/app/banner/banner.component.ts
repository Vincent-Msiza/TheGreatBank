import { Component, OnInit } from '@angular/core';
import { AuthService } from '../testing101/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.authService.getUserInfo(user.uid).subscribe(info => {
          this.userInfo = info;
        });
      }
    });
  }

}
