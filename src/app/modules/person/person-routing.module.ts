import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { ROUTES } from 'src/app/shared/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.LIST,
    pathMatch: 'full',
  },
  {
    path: ROUTES.LIST,
    component: PersonListComponent,
  },
  {
    path: ':id',
    component: PersonDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
