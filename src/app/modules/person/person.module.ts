import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { PersonRoutingModule } from './person-routing.module';
import { MatTableModule } from '@angular/material/table';
import { PersonTransactionsComponent } from './pages/person-details/person-transactions/person-transactions.component';

@NgModule({
  declarations: [PersonListComponent, PersonDetailsComponent, PersonTransactionsComponent],
  imports: [PersonRoutingModule, CommonModule, MatTableModule],
})
export class PersonModule {}
