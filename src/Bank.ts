import core = require('./Core');
import player = require('./Player');;

export class Bank extends core.KMObject {
  total: number;
  accounts: Account[];
  widthdraw(amount: number, player: player.Player): number {
    this.total -= amount;

    return amount;
  }
}

export class Account extends core.KMObject {
  owner: player.Player;
  balance: number;
}
