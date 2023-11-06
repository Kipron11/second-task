import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  links: { route: string; label: string }[] = [
    { route: 'transactions', label: 'Transactions' },
    { route: 'person', label: 'Persons' },
    { route: 'bank', label: 'Banks' },
    { route: 'rating', label: 'Rating' },
  ];
}
