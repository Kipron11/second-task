import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bank } from 'src/app/core/data';
import { ROUTES } from 'src/app/shared/routes';
import { BankService } from 'src/app/shared/services/bank.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
})
export class BankListComponent {
  banks: Bank[] = [];

  constructor(
    private readonly bankService: BankService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.banks = this.bankService.getBanks();
  }

  openBankDetails(id: number) {
    this.router.navigate([`/${ROUTES.BANK}/` + id]);
  }
}
