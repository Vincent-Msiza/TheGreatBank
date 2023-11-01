import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,public router: Router,) { }

  generateAccountNumber(): string {
    // Generate a random 10-digit account number
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return accountNumber.toString();
  }

  //get user info
  getUserInfo(uid: string): Observable<any> {
    return this.db.object(`/users/${uid}/profile`).valueChanges();
  }

  //get balances
  getBalances(uid: string): Observable<any> {
    return this.db.object(`/users/${uid}/balances`).valueChanges();
  }

  //get transactions
  getTransactions(uid: string): Observable<any[]> {
    return this.db.list(`/users/${uid}/transactions`).valueChanges();
  }

  async registerUser(email: string, password: string, userInformation: any) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        const uid = user.uid;
        const accountNumber = this.generateAccountNumber();
        const initialData = {
          profile: {
            ...userInformation,
            accountNumber
          },
          balances: {
            chequeAccount: 0,
            savingsAccount: 0
          },
          transactions: {}
        };
        await this.db.object(`/users/${uid}`).set(initialData);
        await user.sendEmailVerification();
        this.router.navigate(['/verify-email-address']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //working with quick transactions
  //record transactions to db
  recordTransaction(uid: string, type: string, amount: number) {
    const transactionId = this.db.createPushId();
    const timestamp = new Date().getTime();
    return this.db.object(`/users/${uid}/transactions/${transactionId}`).set({ type, amount, timestamp });
  }

  //update balances once deposited
  updateBalances(uid: string, chequeAccount: number, savingsAccount: number) {
    return this.db.object(`/users/${uid}/balances`).update({ chequeAccount, savingsAccount });
  }
   
  
}
