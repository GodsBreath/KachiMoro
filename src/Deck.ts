import core = require('./Core');
import card = require('./Card');
import Pile = require('./Pile');

class Deck extends card.CardCollection {
  name: string;
  constructor();
  constructor(name: string);
  constructor(name? : any) {
    super();
    if (name) {
      name = name;
    }
  };
  createPile(name: string, size: number) : Pile {
    return new Pile(name, this.draw(size));
  };
  
}
