import { Component, OnInit } from '@angular/core';
import { AuthService } from '../testing101/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-available-balance',
  templateUrl: './available-balance.component.html',
  styleUrls: ['./available-balance.component.css']
})
export class AvailableBalanceComponent implements OnInit {

  userInfo: any;
  balances: any = {};

  constructor(private authService: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.authService.getUserInfo(uid).subscribe(info => {
          this.userInfo = info;
        });
        this.authService.getBalances(uid).subscribe(balances => {
          this.balances = balances;
        });
      }
    });
  }

}
