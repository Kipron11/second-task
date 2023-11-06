import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/core/data';
import { BankService } from 'src/app/shared/services/bank.service';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
})
export class RatingComponent implements OnInit {
  banks: { name: string; totalDebt: number }[] = [];
  persons: Person[] = [];

  constructor(
    private readonly personService: PersonService,
    private readonly bankService: BankService
  ) {}

  ngOnInit(): void {
    this.persons = this.personService
      .getPersons()
      .filter((person) => person.debt > 0);

    this.bankService.getBanks().forEach((bank) => {
      let totalAmount: number = 0;

      bank.transactionsApproved.forEach((transaction) => {
        totalAmount += transaction.amount;
        const existingBank = this.banks.find(
          (includedBank) => includedBank.name === bank.name
        );

        if (existingBank) {
          existingBank.totalDebt = totalAmount;
        } else {
          this.banks.push({ name: bank.name, totalDebt: totalAmount });
        }
      });
    });

    this.persons.sort((a, b) => b.debt - a.debt);
    this.banks.sort((a, b) => b.totalDebt - a.totalDebt);
  }
}
