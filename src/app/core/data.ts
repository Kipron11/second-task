// Parāda informācija
export class Transaction {
  id: number;
  personId: number;
  bankId: number;
  amount: number;
  status: TransactionStatus;

  constructor(
    id: number,
    person: Person,
    bank: Bank,
    amount: number,
    status: TransactionStatus
  ) {
    this.id = id;
    this.personId = person.id;
    this.bankId = bank.id;
    this.amount = amount ?? 0;
    this.status = status;
  }
}

// Cilvēka informācija
export class Person {
  id: number;
  name: string;
  balance: number;
  debt: number;
  transactions: Transaction[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.balance = 300;
    this.debt = 0;
  }
}

// Aizdevēja informācija
export class Bank {
  id: number;
  name: string;
  transactionsApproved: Transaction[] = [];
  transactionsPending: Transaction[] = [];
  transactionsClosed: Transaction[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export enum TransactionStatus {
  APPROVED = 'Approved',
  CLOSED = 'Closed',
  PENDING = 'Pending',
}

// Initial data
export const PERSONS: Person[] = [
  new Person(1, 'Zvirbulis'),
  new Person(2, 'Ņikita'),
  new Person(3, 'Spiderman'),
  new Person(4, 'Rexona Men'),
  new Person(5, 'Godu Kvass'),
];

// Initial data
export const BANKS: Bank[] = [
  new Bank(1, 'Swedbank'),
  new Bank(2, 'Seb'),
  new Bank(3, 'Citadele'),
  new Bank(4, 'Credit'),
  new Bank(5, 'Paypal'),
];
