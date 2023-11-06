import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './shared/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.TRANSACTIONS,
    pathMatch:'full'
  },
  {
    path: ROUTES.TRANSACTIONS,
    loadChildren: () => import('./modules/transaction/transaction.module').then((m) => m.TransactionModule),
  },
  {
    path: ROUTES.PERSON,
    loadChildren: () => import('./modules/person/person.module').then((m) => m.PersonModule),
  },
  {
    path: ROUTES.BANK,
    loadChildren: () => import('./modules/bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: ROUTES.RATING,
    loadChildren: () => import('./modules/rating/rating.module').then((m) => m.RatingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
