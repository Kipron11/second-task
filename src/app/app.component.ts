import { Component, OnInit } from '@angular/core';
import { TransactionService } from './shared/services/transaction.service';
import { LocalService } from './shared/services/local.service';
import { BankService } from './shared/services/bank.service';
import { PersonService } from './shared/services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly localService: LocalService,
    private readonly personService: PersonService,
    private readonly bankService: BankService
  ) {}

  ngOnInit(): void {
    this.localService.setLocalStorage(
      this.transactionService.currentTransactions
    );
    this.personService.getPersons();
    this.bankService.getBanks();
  }
}
