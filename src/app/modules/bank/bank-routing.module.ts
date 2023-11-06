import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankDetailsComponent } from './pages/bank-details/bank-details.component';
import { BankListComponent } from './pages/bank-list/bank-list.component';
import { ROUTES } from 'src/app/shared/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.LIST,
    pathMatch: 'full',
  },
  {
    path: ROUTES.LIST,
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
