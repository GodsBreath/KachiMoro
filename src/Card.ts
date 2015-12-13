import core = require('./Core');

export abstract class Card extends core.Object {
	name: string;
	image: string;
	iconImage: string;
	cost: number;
	activation: number[];
	constructor(public priority: number) {
		super();
	}
}

export interface Shuffler {
	(cards: core.KMArray<Card>): void;
}

export class CardCollection extends core.Object {
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
	add(card: Card): void {
		this.cards.push(card);
	};
	remove(cls: Function, count?: number): CardCollection {
      var removed = new CardCollection();
			var index: number;
			count = count || Number.MAX_SAFE_INTEGER;

			function cardPredicate(card: Card) : boolean {
				return card instanceof cls;
			}

      while ((index = this.cards.findIndex(cardPredicate)) > -1 && count-- > 0) {
				removed.add(this.cards.remove(index));
			}

			return removed;
	};
}

export class PrimaryIndustry extends Card {
	constructor() {
		super(2);
	}
}

export class SecondaryIndustry extends Card {
	constructor() {
		super(2);
	}
}

export class Restaurant extends Card {
	constructor() {
		super(1);
	}
}

export class MajorEstablishment extends Card {
	constructor() {
		super(3);
	}
}

export class Landmark extends Card {
	constructor() {
		super(0);
	}
}
