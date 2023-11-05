import { Injectable } from '@angular/core';
import { PERSONS, Person } from 'src/app/core/data';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  getPersons(): Person[] {
    return PERSONS;
  }

  findPersonById(id: number): Person {
    return PERSONS.find((person) => person.id == id) as Person;
  }
}
