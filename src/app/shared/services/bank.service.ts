import { Injectable } from '@angular/core';
import { BANKS, Bank } from 'src/app/core/data';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  getBanks() {
    return BANKS;
  }

  findBankById(id: number): Bank {
    return BANKS.find((bank) => bank.id == id) as Bank;
  }
}
