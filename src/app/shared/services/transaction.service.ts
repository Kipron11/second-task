import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Bank,
  Person,
  Transaction,
  TransactionStatus,
} from 'src/app/core/data';
import { PersonService } from './person.service';
import { BankService } from './bank.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>(
    this.getTransactionsFromLocalStorage()
  );

  private personsSubject = new BehaviorSubject<Person[]>(
    this.personService.getPersons()
  );

  private banksSubject = new BehaviorSubject<Bank[]>(
    this.bankService.getBanks()
  );

  currentPersons = this.personsSubject.value;
  persons$ = this.personsSubject.asObservable();

  currentBanks = this.banksSubject.value;
  banks$ = this.banksSubject.asObservable();

  currentTransactions = this.transactionsSubject.value;
  transactions$ = this.transactionsSubject.asObservable();

  constructor(
    private readonly personService: PersonService,
    private readonly bankService: BankService,
    private readonly localService: LocalService
  ) {}

  setTransaction(transaction: Transaction) {
    this.currentTransactions.push(transaction);

    const person = this.personService.findPersonById(transaction.personId);
    const bank = this.bankService.findBankById(transaction.bankId);
    this.notifyTransactionChange();

    this.bankService.updatedBanksInLocalStorage(bank);
    this.personService.updatedPersonsInLocalStorage(person);
    this.localService.setLocalStorage(this.currentTransactions);
  }

  getTransactionsByStatus(status: TransactionStatus) {
    return this.currentTransactions.filter(
      (transaction) => transaction.status === status
    );
  }

  processTransaction(transaction: Transaction, status: TransactionStatus) {
    const { personId, bankId, id } = transaction;
    const person = this.personService.findPersonById(personId);
    const bank = this.bankService.findBankById(bankId);

    if (status === TransactionStatus.APPROVED) {
      person.balance += transaction.amount;
      person.debt += transaction.amount;
      person.transactions.find((item) => {
        if (item.id == transaction.id) {
          item.status = transaction.status;
        }
      });
      bank.transactionsApproved.push(transaction);
      bank.transactionsPending = bank.transactionsPending.filter(
        (item) => item.id !== id
      );
    } else if (status === TransactionStatus.CLOSED) {
      person.balance -= transaction.amount;
      person.debt -= transaction.amount;
      person.transactions.find((item) => {
        if (item.id == transaction.id) {
          item.status = transaction.status;
        }
      });
      this.currentTransactions.find((item) => {
        if (item.id == transaction.id) {
          item.status = transaction.status;
        }
      });
      bank.transactionsClosed.push(transaction);
      bank.transactionsApproved = bank.transactionsApproved.filter(
        (item) => item.id !== id
      );
    }

    this.bankService.updatedBanksInLocalStorage(bank);
    this.personService.updatedPersonsInLocalStorage(person);
    this.localService.setLocalStorage(this.currentTransactions);
    this.notifyTransactionChange();
  }

  getTransactionsLength() {
    return this.currentTransactions.length;
  }

  private notifyTransactionChange() {
    this.transactionsSubject.next(this.currentTransactions);
    this.personsSubject.next(this.currentPersons);
    this.banksSubject.next(this.currentBanks);
  }

  private getTransactionsFromLocalStorage() {
    const dataJson = localStorage.getItem('transactions');
    return dataJson ? (JSON.parse(dataJson) as Transaction[]) : [];
  }
}
