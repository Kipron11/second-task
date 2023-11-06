import { Component, Input } from '@angular/core';
import { Transaction, TransactionStatus } from 'src/app/core/data';
import { BankService } from 'src/app/shared/services/bank.service';
import { PersonService } from 'src/app/shared/services/person.service';
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

  constructor(
    private readonly transactionService: TransactionService,
    private readonly personService: PersonService,
    private readonly bankService: BankService
  ) {}

  approveTransaction(element: Transaction) {
    if (element.status == TransactionStatus.PENDING) {
      element.status = TransactionStatus.APPROVED;

      this.transactionService.processTransaction(
        element,
        TransactionStatus.APPROVED
      );
    }
  }

  findPersonNameById(id: number) {
    return this.personService.findPersonNameById(id);
  }

  findBankNameById(id: number) {
    return this.bankService.findBankNameById(id);
  }
}
