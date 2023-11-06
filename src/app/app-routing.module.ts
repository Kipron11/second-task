import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'transactions',
    pathMatch:'full'
  },
  {
    path: 'transactions',
    loadChildren: () => import('./modules/transaction/transaction.module').then((m) => m.TransactionModule),
  },
  {
    path: 'person',
    loadChildren: () => import('./modules/person/person.module').then((m) => m.PersonModule),
  },
  {
    path: 'bank',
    loadChildren: () => import('./modules/bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'rating',
    loadChildren: () => import('./modules/rating/rating.module').then((m) => m.RatingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
