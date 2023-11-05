// Parāda informācija
export class Transaction {
  static idCounter = 1;

  id: number;
  person: Person;
  bank: Bank;
  amount: number;
  status: TransactionStatus;

  constructor(
    person: Person,
    bank: Bank,
    amount: number,
    status: TransactionStatus
  ) {
    this.id = Transaction.idCounter++;
    this.person = person;
    this.bank = bank;
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
  transactions: Transaction[];

  constructor(id: number, name: string, transactions: Transaction[]) {
    this.id = id;
    this.name = name;
    this.balance = 300;
    this.debt = 0;
    this.transactions = transactions;
  }
}

// Aizdevēja informācija
export class Bank {
  id: number;
  name: string;
  transactionsApproved: Transaction[];
  transactionsPending: Transaction[];
  transactionsClosed: Transaction[];

  constructor(
    id: number,
    name: string,
    transactionsApproved: Transaction[],
    transactionsPending: Transaction[],
    transactionsClosed: Transaction[]
  ) {
    this.id = id;
    this.name = name;
    this.transactionsApproved = transactionsApproved;
    this.transactionsPending = transactionsPending;
    this.transactionsClosed = transactionsClosed;
  }
}

export enum TransactionStatus {
  APPROVED = 'Approved',
  CLOSED = 'Closed',
  PENDING = 'Pending',
}

export const PERSONS = [
  new Person(1, 'Zvirbulis', []),
  new Person(2, 'Ņikita', []),
  new Person(3, 'Spiderman', []),
  new Person(4, 'Rexona Men', []),
  new Person(5, 'Godu Kvass', []),
];

export const BANKS = [
  new Bank(1, 'Swedbank', [],[], []),
  new Bank(2, 'Seb', [],[], []),
  new Bank(3, 'Citadele', [],[], []),
  new Bank(4, 'Credit', [],[], []),
  new Bank(5, 'Paypal', [],[], []),
];
