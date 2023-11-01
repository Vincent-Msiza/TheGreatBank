import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modals/modal.service'; 

  

@Component({
  selector: 'app-quick-transactions',
  templateUrl: './quick-transactions.component.html',
  styleUrls: ['./quick-transactions.component.css']
})
export class QuickTransactionsComponent implements OnInit {
 
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  isPopoutVisible = false;
  isSendMoney = false;
  isTranferMoney = false;
  isDepositMoney = false;

  
  openSendMoney() {
    this.isSendMoney = !this.isSendMoney;
  }
  closeSendMoney(){
    this.isSendMoney = false;
  }

  openTranferMoney() {
    this.isTranferMoney = !this.isTranferMoney;
  }
  closeTranferMoney(){
    this.isTranferMoney = false;
  }
  openDepositeMoney() {
    this.isDepositMoney = !this.isDepositMoney;
  }
  closeDepositMoney(){
    this.isDepositMoney = false;
  }


  openPopout() {
    this.isPopoutVisible = !this.isPopoutVisible;
  }

  closePopout() {
    this.isPopoutVisible = false;
  }

  openDepositModal() {
    this.modalService.show();
  }

}
 

 

 
