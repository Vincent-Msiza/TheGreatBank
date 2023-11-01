import { Component, Output, EventEmitter } from '@angular/core';
import { BankingService } from 'src/app/banking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.css']
})
export class DepositMoneyComponent {
  amount: number = 0;
  accountType: string ='chequeAccount';  // Default to available balance

  constructor(
    private bankingService: BankingService,
    private router: Router
  ) {}

  onSubmit() {
    this.bankingService.deposit(this.amount, this.accountType).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
