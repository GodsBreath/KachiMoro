import core = require('../Core');
import card = require('../Card');
import player = require('../Player');
import Roll = require('../Roll');

export class StarterWheatField extends card.PrimaryIndustry {
  constructor() {
    super();
    this.name = 'Starter Wheat Field';
    this.cost = 0;
    this.description = 'Receive one coin when any player rolls a 1.';
  }
  shouldActivate(player: player.Player, roll: Roll): boolean {
    return roll.total == 1;
  }
  activate(player: player.Player, opponents: player.Player[]): core.KMArray<card.Effect> {
    return new core.KMArray<card.Effect>();
  }
}
