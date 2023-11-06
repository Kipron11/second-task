import { Component, Input, OnInit } from '@angular/core';
import { Transaction, TransactionStatus } from 'src/app/core/data';
import { BankService } from 'src/app/shared/services/bank.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-person-transactions',
  templateUrl: './person-transactions.component.html',
})
export class PersonTransactionsComponent implements OnInit {

  @Input({required: true}) transactions!:Transaction[]
  displayedColumns: string[] = ['id', 'person', 'bank', 'amount', 'status'];

  transactionStatuses = TransactionStatus;

  constructor( private readonly transactionService: TransactionService,
    private readonly personsService: PersonService,
    private readonly banksService: BankService ){}

  ngOnInit(): void {
    this.transactions.sort((a, b) => a.status.localeCompare(b.status))
  }

  closeTransaction(element:Transaction){
    if (element.status == TransactionStatus.APPROVED) {
      element.status = TransactionStatus.CLOSED;
      
      this.transactionService.processTransaction(element, TransactionStatus.CLOSED);
    }
  }

  findPersonNameById(id: number) {
    return this.personsService.findPersonNameById(id);
  }

  findBankNameById(id: number) {
    return this.banksService.findBankNameById(id);
  }
}
