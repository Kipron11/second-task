import { Component, OnInit } from '@angular/core';
import { TransactionService } from './shared/services/transaction.service';
import { LocalService } from './shared/services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly localService: LocalService
  ) {}

  ngOnInit(): void {
    this.localService.setLocalStorage(
      this.transactionService.currentTransactions
    );
  }
}
