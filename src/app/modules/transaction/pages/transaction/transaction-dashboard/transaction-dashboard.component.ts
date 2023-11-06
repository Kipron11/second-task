import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Bank,
  Person,
  Transaction,
  TransactionStatus,
} from 'src/app/core/data';
import { BankService } from 'src/app/shared/services/bank.service';
import { PersonService } from 'src/app/shared/services/person.service';
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

  persons: Person[] = this.personsService.getPersons();
  banks: Bank[] = this.banksService.getBanks();

  private transactionSubscription!: Subscription;
  private personsSubscription!: Subscription;
  private banksSubscription!: Subscription;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly personsService: PersonService,
    private readonly banksService: BankService
  ) {}

  ngOnInit(): void {
    this.transactionSubscription =
      this.transactionService.transactions$.subscribe((transactions) => {
        this.transactions = transactions;
        this.pendingTransactions =
          this.transactionService.getTransactionsByStatus(
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

    this.personsSubscription = this.transactionService.persons$.subscribe(
      (persons) => {
        this.persons = persons;
        this.persons = [...this.persons];
      }
    );

    this.banksSubscription = this.transactionService.banks$.subscribe(
      (banks) => {
        this.banks = banks;
        this.banks = [...this.banks];
      }
    );
  }

  ngOnDestroy(): void {
    this.transactionSubscription.unsubscribe();
    this.personsSubscription.unsubscribe();
    this.banksSubscription.unsubscribe();
  }
}
