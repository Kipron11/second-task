import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/core/data';
import { ROUTES } from 'src/app/shared/routes';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(
    private readonly personService: PersonService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.persons = this.personService.getPersons();
  }

  openPersonDetails(id: number) {
    this.router.navigate([`/${ROUTES.PERSON}/` + id]);
  }
}
