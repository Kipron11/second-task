import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRoutingModule } from './bank-routing.module';
import { BankListComponent } from './pages/bank-list/bank-list.component';
import { BankDetailsComponent } from './pages/bank-details/bank-details.component';



@NgModule({
  declarations: [
    BankListComponent,
    BankDetailsComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule
  ]
})
export class BankModule { }
