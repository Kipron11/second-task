import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/core/data';
import { ROUTES } from 'src/app/shared/routes';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
})
export class PersonDetailsComponent {
  id!: number;
  person!: Person;
  constructor(
    private route: ActivatedRoute,
    private readonly personService: PersonService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.person = this.personService.findPersonById(this.id);
    const statusOrder = { Approved: 1, Pending: 2, Closed: 3 };
  }

  backToList() {
    this.router.navigate([`${ROUTES.PERSON}/${ROUTES.LIST}`]);
  }
}
