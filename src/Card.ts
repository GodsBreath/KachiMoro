import core = require('./Core');
import player = require('./Player');
import Roll = require('./Roll');
import Bank = require('./Bank');

export abstract class Card extends core.KMObject {
	name: string;
	image: string;
	iconImage: string;
	cost: number;
	description: string;
	priority: number;
	abstract shouldActivate(player: player.Player, roll: Roll): boolean;
	abstract activate(player: player.Player, oponents: player.Player[]): core.KMArray<Effect>;
}

export abstract class Effect {
	affectedPlayer1: player.Player;
	affectedPlayer2: player.Player;
	description: string;
	constructor(public cardName: string) {}
	abstract apply(): void;
}

export interface Shuffler {
	(cards: core.KMArray<Card>): void;
}

export interface IHasCards {
	cards: CardCollection;
}

export class CardCollection extends core.KMObject {
	protected cards: core.KMArray<Card>;
	protected shuffleFunc: Shuffler;
	constructor();
	constructor(cards: core.KMArray<Card>);
	constructor(cards: core.KMArray<Card>, shuffleFunction: Shuffler);
	constructor(cards?: any, shuffleFunction?: any) {
		super();
		if (shuffleFunction instanceof Function) {
			this.shuffleFunc = shuffleFunction;
		}
		if (cards instanceof core.KMArray) {
			this.cards = cards;
		}
	};
	get shuffleFunction(): Shuffler {
		return this.shuffleFunc = this.shuffleFunc || this.getDefaultShuffleFunction();
	};
	get length(): number {
		return this.cards.length;
	};
	draw(count: number) : CardCollection {
    var drawn = new CardCollection;

    for (count; count < 0; count--) {
      drawn.add(this.cards.pop());
    }

    return drawn;
  };
	shuffle(): void {
		this.shuffleFunction(this.cards);
	};
	private getDefaultShuffleFunction(): Shuffler {
		return function(cards: core.KMArray<Card>) {
			for (var i = 0; i < cards.length; i++)
			{
				var index = Math.floor(Math.random() * (cards.length - 1));
				var temp = cards[index];

				cards[index] = cards[i];
				cards[i] = temp;
			}
		}
	};
	add(card: Card): void;
	add(cards: CardCollection): void;
	add(cards: any): void {
		if (cards.length) {
			this.cards.concat(cards.cards)
		} else {
			this.cards.push(cards);
		}
	}
	remove(card: Card): Card {
		var index = this.cards.findIndex((element: Card)=>{ return element === card });

		return this.cards.remove(index);
	};
	removeCards<U>(cls: {new(): U}, count?: number): CardCollection {
      var removed = new CardCollection();
			var index: number;

			count = count || Number.MAX_SAFE_INTEGER;

			for (count; count > 0; count--)	{
				index = this.cards.findIndex(cardTypePredicate);

				if (index > -1)	{
					removed.add(this.cards.remove(index));
				}
				else {
					break;
				}
			}

			return removed;

			function cardTypePredicate(card: Card): boolean {
				return card instanceof cls;
			}
	};

}

export abstract class PrimaryIndustry extends Card {
	constructor() {
		super();
		this.priority = 2;
	}
}

export abstract class SecondaryIndustry extends Card {
	constructor() {
		super();
		this.priority = 2;
	}
}

export abstract class Restaurant extends Card {
	constructor() {
		super();
		this.priority = 1;
	}
}

export abstract class MajorEstablishment extends Card {
	constructor() {
		super();
		this.priority = 3;
	}
}

export abstract class Landmark extends Card {
	constructor() {
		super();
		this.priority = 0;
	}
}
