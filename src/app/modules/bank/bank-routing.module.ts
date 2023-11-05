import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankDetailsComponent } from './pages/bank-details/bank-details.component';
import { BankListComponent } from './pages/bank-list/bank-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: BankListComponent,
  },
  {
    path: ':id',
    component: BankDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingModule {}
