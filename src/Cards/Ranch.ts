import card = require('../Card');
import core = require('../Core');
import effects = require('./Effects');
import player = require('../Player');
import Roll = require('../Roll');

class Ranch extends card.PrimaryIndustry {
  constructor() {
    super();
    this.name = 'Ranch';
    this.cost = 1;
    this.description = 'Receive one coin when any player rolls a 2.';
  };
  shouldActivate(player: player.Player, roll: Roll): boolean {
    return roll.total == 2;
  };
  activate(player: player.Player, oponents: player.Player[]): core.KMArray<card.Effect>  {
    return new core.KMArray<effects.GainCoinsEffect>(
      new effects.GainCoinsEffect(this.name, player, 1)
    );
  }
}

export = Ranch;
