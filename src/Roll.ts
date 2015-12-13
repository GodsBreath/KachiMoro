import core = require('./Core');
import player = require('./Player');

class Roll extends core.Object {
  doubles: boolean;
  total: number;
  constructor(public player: player.Player, public dice: number[]) {
    super();
    this.doubles = dice[0] == dice[1];
    this.total = dice[0] + dice[1];
  }
}

export = Roll;
