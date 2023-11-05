import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction, TransactionStatus } from 'src/app/core/data';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  currentTransactions = this.transactionsSubject.value;

  transactions$ = this.transactionsSubject.asObservable();

  setTransaction(transaction: Transaction) {
    this.currentTransactions.push(transaction);
    this.notifyTransactionChange();
  }

  getTransactions() {
    const transactionJson = localStorage.getItem('transactions');
    let transactions: Transaction[] = [];

    if (transactionJson) {
      try {
        transactions = JSON.parse(transactionJson) as Transaction[];
      } catch (error) {
        transactions = this.currentTransactions;
      }
    }

    return transactions;
  }

  getTransactionsByStatus(status: TransactionStatus) {
    return this.currentTransactions.filter(
      (transaction) => transaction.status === status
    );
  }

  processTransaction(transaction: Transaction, status: TransactionStatus) {
    const { person, bank, id } = transaction;

    if (status === TransactionStatus.APPROVED) {
      person.balance += transaction.amount;
      person.debt += transaction.amount;
      bank.transactionsApproved.push(transaction);
      bank.transactionsPending = bank.transactionsPending.filter(
        (item) => item.id !== id
      );
    } else if (status === TransactionStatus.CLOSED) {
      person.balance -= transaction.amount;
      person.debt -= transaction.amount;
      bank.transactionsClosed.push(transaction);
      bank.transactionsApproved = bank.transactionsApproved.filter(
        (item) => item.id !== id
      );
    }

    this.notifyTransactionChange();
  }

  private notifyTransactionChange() {
    this.transactionsSubject.next(this.currentTransactions);
  }
}
