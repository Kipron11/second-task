import { Injectable } from '@angular/core';
import { Bank } from 'src/app/core/data';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  updatedBanksInLocalStorage(bank: Bank) {
    let bankArray = this.parseBanksFromStorage();

    const bankIndexToModify = bankArray.findIndex(
      (bn: Bank) => bn.id === bank.id
    );

    if (bankIndexToModify !== -1) {
      const updatedBankArray = [...bankArray];
      updatedBankArray[bankIndexToModify] = bank;
      bankArray = updatedBankArray;
      localStorage.setItem('banks', JSON.stringify(bankArray));
    }
  }

  getBanks(): Bank[] {
    return this.parseBanksFromStorage();
  }

  findBankById(id: number): Bank {
    return this.parseBanksFromStorage().find((bank) => bank.id == id) as Bank;
  }

  findBankNameById(id: number): string {
    const bank = this.findBankById(id);
    return bank ? bank.name : '';
  }

  private parseBanksFromStorage() {
    const dataJson = localStorage.getItem('banks');

    const storedBanks = dataJson ? (JSON.parse(dataJson) as Bank[]) : [];

    return storedBanks;
  }
}
