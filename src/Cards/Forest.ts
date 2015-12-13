import card = require('../Card');
import core = require('../Core');
import effects = require('./Effects');
import player = require('../Player');
import Roll = require('../Roll');

class Forest extends card.PrimaryIndustry {
  constructor() {
    super();
    this.name = 'Forest';
    this.cost = 3;
    this.description = 'Receive one coin when any player rolls a 5.';
  };
  shouldActivate(player: player.Player, roll: Roll): boolean {
    return roll.total == 5;
  };
  activate(player: player.Player, oponents: player.Player[]): core.KMArray<card.Effect>  {
    return new core.KMArray<effects.GainCoinsEffect>(
      new effects.GainCoinsEffect(this.name, player, 1)
    );
  }
}

export = Forest;
