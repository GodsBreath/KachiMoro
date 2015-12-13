import core = require('./Core');
import card = require('./Card');

export class Player extends core.Object implements card.IHasCards {
  coins: number = 0;
  cards: card.CardCollection = new card.CardCollection();
  gainCoins(count: number) {
    this.coins += count;
  };
  loseCoins(count: number) {
    var coins = this.coins - count;
    var lost;

    if (coins < 0) {
      lost = count + coins;
      this.coins = 0;
    }
    else {
      lost = count;
      this.coins = coins;
    }

    return lost;
  };
  gainCard(card: card.Card) {
    this.cards.add(card);
  };
  loseCard(card: card.Card) {
    this.cards.remove(card);
  }
}

export class ComputerPlayer extends Player {

}

export class HumanPlayer extends Player {

}
