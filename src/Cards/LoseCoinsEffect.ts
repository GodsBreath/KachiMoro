import card = require('../Card');
import player = require('../Player');

class LoseCoinsEffect extends card.Effect<number> {
  constructor(affectedPlayer: player.Player, private coins: number) {
    super(affectedPlayer);
  }
  apply(): number {
    return this.affectedPlayer.loseCoins(this.coins);
  }
}

export = LoseCoinsEffect;
