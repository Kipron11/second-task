import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bank } from 'src/app/core/data';
import { BankService } from 'src/app/shared/services/bank.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
})
export class BankDetailsComponent {
  id!: number;
  bank!: Bank;

  constructor(
    private route: ActivatedRoute,
    private readonly bankService: BankService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bank = this.bankService.findBankById(this.id);
  }

  backToList() {
    this.router.navigate(['bank/list']);
  }
}
