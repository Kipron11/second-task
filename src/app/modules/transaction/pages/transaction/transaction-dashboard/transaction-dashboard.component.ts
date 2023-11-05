import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction, TransactionStatus } from 'src/app/core/data';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
})
export class TransactionDashboardComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  pendingTransactions: Transaction[] = [];
  approvedTransactions: Transaction[] = [];
  transactionStatuses = TransactionStatus;
  private transactionSubscription!: Subscription;

  constructor(private readonly transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionSubscription =
      this.transactionService.transactions$.subscribe((transactions) => {
        this.transactions = transactions;
        this.pendingTransactions = this.transactionService.getTransactionsByStatus(
          this.transactionStatuses.PENDING
        );
        this.approvedTransactions =
          this.transactionService.getTransactionsByStatus(
            this.transactionStatuses.APPROVED
          );

        this.transactions = [...this.transactions];
        this.pendingTransactions = [...this.pendingTransactions];
        this.approvedTransactions = [...this.approvedTransactions];
      });
  }

  ngOnDestroy(): void {
    this.transactionSubscription.unsubscribe();
  }
}
