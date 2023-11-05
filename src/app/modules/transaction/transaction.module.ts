import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionFormComponent } from './pages/transaction/transaction-form/transaction-form.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionDashboardComponent } from './pages/transaction/transaction-dashboard/transaction-dashboard.component';
import { TransactionColumnComponent } from './pages/transaction/transaction-dashboard/transaction-column/transaction-column.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionFormComponent,
    TransactionDashboardComponent,
    TransactionColumnComponent,
  ],
  imports: [
    TransactionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class TransactionModule {}
