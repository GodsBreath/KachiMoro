import card = require('../Card');
import player = require('../Player');

export abstract class CoinsEffect extends card.Effect {
  protected coins: number;
  constructor(cardName: string, coins: number) {
    super(cardName);
    this.coins = coins;
  }
}

export class GainCoinsEffect extends CoinsEffect {
  constructor(cardName: string, gainingPlayer: player.Player, coins: number) {
    super(cardName, coins);
    this.affectedPlayer1 = gainingPlayer;
  }
  apply(): void {
    this.affectedPlayer1.gainCoins(this.coins);
  }
  get description(): string {
    return this.affectedPlayer1.displayName + ' earned ' + this.coins + ' coins from his ' + this.cardName + '.';
  }
}

export class LoseCoinsEffect extends CoinsEffect {
  constructor(cardName: string, losingPlayer: player.Player, gainingPlayer: player.Player, coins: number) {
    super(cardName, coins);
    this.affectedPlayer1 = losingPlayer;
    this.affectedPlayer2 = gainingPlayer;
  }
  apply(): void {
    var lost = this.affectedPlayer1.loseCoins(this.coins);
    var gainCoins = new GainCoinsEffect(this.cardName, this.affectedPlayer2, lost);
    gainCoins.apply();
  }
  get description() {
    return this.affectedPlayer2.displayName + ' earned ' + this.coins + ' coins from his ' + this.cardName
      + ' at the expense of ' + this.affectedPlayer1 + '.';
  }
}
