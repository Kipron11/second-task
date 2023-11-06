import { Component } from '@angular/core';
import { ROUTES } from 'src/app/shared/routes';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  links: { route: string; label: string }[] = [
    { route: ROUTES.TRANSACTIONS, label: 'Transactions' },
    { route: ROUTES.PERSON, label: 'Persons' },
    { route: ROUTES.BANK, label: 'Banks' },
    { route: ROUTES.RATING, label: 'Rating' },
  ];
}
