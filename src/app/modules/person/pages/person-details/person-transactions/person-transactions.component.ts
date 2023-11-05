import { Component, Input, OnInit } from '@angular/core';
import { Transaction, TransactionStatus } from 'src/app/core/data';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-person-transactions',
  templateUrl: './person-transactions.component.html',
})
export class PersonTransactionsComponent implements OnInit {

  @Input({required: true}) transactions!:Transaction[]
  displayedColumns: string[] = ['id', 'person', 'bank', 'amount', 'status'];

  transactionStatuses = TransactionStatus;

  constructor(private readonly transactionService:TransactionService){}

  ngOnInit(): void {
    this.transactions.sort((a, b) => a.status.localeCompare(b.status))
  }

  closeTransaction(element:Transaction){
    if (element.status == TransactionStatus.APPROVED) {
      element.status = TransactionStatus.CLOSED;
      
      this.transactionService.processTransaction(element, TransactionStatus.CLOSED);
    }
  }
}
