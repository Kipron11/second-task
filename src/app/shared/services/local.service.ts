import { Injectable } from '@angular/core';
import { BANKS, Bank, PERSONS, Person, Transaction } from 'src/app/core/data';
import { PersonService } from './person.service';
import { BankService } from './bank.service';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor(
    private readonly personService: PersonService,
    private readonly bankService: BankService
  ) {}
  setLocalStorage(currentTransactions: Transaction[]): void {
    let serializedData: {persons:Person[], banks:Bank[], transactions:Transaction[]}
    const personsJson = localStorage.getItem('persons');
    const banksJson = localStorage.getItem('banks');

    if (personsJson && banksJson) {
      serializedData = {
        persons: this.personService.getPersons().map((person)=>({
          id: person.id,
          name: person.name,
          balance: person.balance,
          debt: person.debt,
          transactions: person.transactions,
        }))
        ,
        banks: this.bankService.getBanks().map((bank) => ({
          id: bank.id,
          name: bank.name,
          transactionsApproved: bank.transactionsApproved,
          transactionsPending: bank.transactionsPending,
          transactionsClosed: bank.transactionsClosed,
        })),
  
        transactions: currentTransactions.map((transaction) => ({
          id: transaction.id,
          personId: transaction.personId,
          bankId: transaction.bankId,
          amount: transaction.amount,
          status: transaction.status,
        })),
      };
    } else {
      serializedData = {
      persons: PERSONS,
      banks: BANKS,
      transactions: currentTransactions,
    };
    }

    localStorage.setItem('banks', JSON.stringify(serializedData.banks));
    localStorage.setItem('persons', JSON.stringify(serializedData.persons));
    localStorage.setItem('transactions', JSON.stringify(serializedData.transactions));
  }
}
