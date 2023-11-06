import { Injectable, OnInit } from '@angular/core';
import { PERSONS, Person } from 'src/app/core/data';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  updatedPersonsInLocalStorage(person: Person) {
    let personArray = this.parsePersonsFromStorage();

    const personIndexToModify = personArray.findIndex(
      (per: Person) => per.id === person.id
    );

    if (personIndexToModify !== -1) {
      const updatedPersonArray = [...personArray];
      updatedPersonArray[personIndexToModify] = person;
      personArray = updatedPersonArray;
      localStorage.setItem('persons', JSON.stringify(personArray));
    }
  }

  getPersons(): Person[] {
    return this.parsePersonsFromStorage();
  }

  findPersonById(id: number): Person {
    return this.parsePersonsFromStorage().find(
      (person) => person.id == id
    ) as Person;
  }

  findPersonNameById(id: number): string {
    const person = this.findPersonById(id);
    return person ? person.name : '';
  }

  private parsePersonsFromStorage() {
    const dataJson = localStorage.getItem('persons');
    const storedPersons = dataJson ? (JSON.parse(dataJson) as Person[]) : [];
    return storedPersons;
  }
}
