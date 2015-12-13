import core = require('./Core');
import card = require('./Card');

class Pile extends card.CardCollection {
  name: string;
  constructor(name: string);
  constructor(cards: card.CardCollection);
  constructor(name: string, cards: card.CardCollection);
  constructor(name?: any, cards?: any) {
    super();

    if (typeof(name) == 'string') {
      this.name = name;
    }
    else if (name instanceof core.KMArray) {
      this.cards = name;
    }

    if (cards instanceof core.KMArray) {
      this.cards = cards;
    }
  }
  discard(cards: card.CardCollection) {
    this.cards = <core.KMArray<card.Card>> this.cards.concat(cards);
  };
}
export = Pile;
