import { Component, Input } from '@angular/core';
import { Transaction, TransactionStatus } from 'src/app/core/data';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-transaction-column',
  templateUrl: './transaction-column.component.html',
})
export class TransactionColumnComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) transactionDetails!: Transaction[];
  
  displayedColumns: string[] = ['id', 'person', 'bank', 'amount', 'status'];

  transactionStatuses = TransactionStatus;

  constructor(private readonly transactionService: TransactionService) {}

  approveTransaction(element: Transaction) {
    if (element.status == TransactionStatus.PENDING) {
      element.status = TransactionStatus.APPROVED;
      
      this.transactionService.processTransaction(element, TransactionStatus.APPROVED);
    }
  }
}
