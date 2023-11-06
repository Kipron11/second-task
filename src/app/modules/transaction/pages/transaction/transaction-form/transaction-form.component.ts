import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
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
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  banks: Bank[] = [];
  transactionForm!: FormGroup;
  selectedPerson!: Person;
  selectedBank!: Bank;

  private readonly destroy$ = new Subject();

  constructor(
    private readonly personService: PersonService,
    private readonly bankService: BankService,
    private readonly transactionService: TransactionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.watchPersonChanges();
    this.watchBankChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  createTransaction() {
    const { personId, bankId, amount } = this.transactionForm.value;
    const person: Person = this.personService.findPersonById(personId);
    const bank: Bank = this.bankService.findBankById(bankId);

    const transactionStatus = TransactionStatus.PENDING;
    const transactionsLength = this.transactionService.getTransactionsLength();

    const transaction: Transaction = new Transaction(
      transactionsLength,
      person,
      bank,
      amount,
      transactionStatus
    );

    person.transactions.push(transaction);
    bank.transactionsPending.push(transaction);

    this.personService.updatedPersonsInLocalStorage(person);
    this.bankService.updatedBanksInLocalStorage(bank);
    this.transactionService.setTransaction(transaction);

    this.transactionForm.reset();
  }

  onPersonSelectionChange(id: number) {
    this.selectedPerson = this.personService.findPersonById(id);
  }
  onBankSelectionChange(id: number) {
    this.selectedBank = this.bankService.findBankById(id);
  }

  private initializeForm(): void {
    this.transactionForm = this.fb.group({
      personId: [null, Validators.required],
      bankId: [null, Validators.required],
      amount: [null, Validators.required],
    });

    this.persons = this.personService.getPersons();
    this.banks = this.bankService.getBanks();
  }

  private watchPersonChanges() {
    this.transactionService.persons$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.persons = this.personService.getPersons();
        if (!this.selectedPerson) return;
        this.persons.forEach((person) => {
          if (person.id == this.selectedPerson.id) {
            this.selectedPerson = { ...person };
          }
        });
      });
  }

  private watchBankChanges() {
    this.transactionService.banks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.banks = this.bankService.getBanks();
        if (!this.selectedBank) return;
        this.banks.forEach((person) => {
          if (person.id == this.selectedBank.id) {
            this.selectedBank = { ...person };
          }
        });
      });
  }
}
