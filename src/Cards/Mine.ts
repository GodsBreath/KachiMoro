import card = require('../Card');
import core = require('../Core');
import effects = require('./Effects');
import player = require('../Player');
import Roll = require('../Roll');

class Mine extends card.PrimaryIndustry {
  constructor() {
    super();
    this.name = 'Mine';
    this.cost = 5;
    this.description = 'Receive one coin when any player rolls a 9.';
  };
  shouldActivate(player: player.Player, roll: Roll): boolean {
    return roll.total == 9;
  };
  activate(player: player.Player, oponents: player.Player[]): core.KMArray<card.Effect>  {
    return new core.KMArray<effects.GainCoinsEffect>(
      new effects.GainCoinsEffect(this.name, player, 5)
    );
  }
}

export = Mine;
