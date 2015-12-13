import card = require('../Card');
import player = require('../Player');

export abstract class CoinsEffect extends card.Effect {
  protected coins: number;
  constructor(coins: number) {
    super();
    this.coins = coins;
  }
}

export class GainCoinsEffect extends CoinsEffect {
  constructor(gainingPlayer: player.Player, coins: number) {
    super(coins);
    this.affectedPlayer1 = gainingPlayer;
  }
  apply(): void {
    this.affectedPlayer1.gainCoins(this.coins);
  }
}

export class LoseCoinsEffect extends card.Effect {
  constructor(losingPlayer: player.Player, gainingPlayer: player.Player, private coins: number) {
    super();
    this.affectedPlayer1 = losingPlayer;
    this.affectedPlayer2 = gainingPlayer;
  }
  apply(): void {
    var lost = this.affectedPlayer1.loseCoins(this.coins);
    var gainCoins = new GainCoinsEffect(this.affectedPlayer2, lost);
    gainCoins.apply(); 
  }
}
