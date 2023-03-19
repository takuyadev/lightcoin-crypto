let balance = 500.0;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    console.log(this.transactions);
    const total = this.transactions.reduce(
      (acc, curr) => (acc += curr.value),
      0
    );
    return balance + total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
  }
}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  isAllowed() {
    return this.amount > balance ? false : true;
  }

  get value() {
    return this.amount * -1;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.value;
t1.commit();
console.log("Transaction 1:", t1);

t2 = new Withdrawal(9.99, myAccount);
t2.value;
t2.commit();
console.log("Transaction 2:", t2);

console.log("Balance:", balance);
t3 = new Deposit(120.0, myAccount);
t3.value;
t3.commit();
console.log("Transaction 3:", t3);

t1 = new Withdrawal(550.25, myAccount);
t1.value;
t1.commit();

console.log("Balance: ", myAccount.balance);
