import { log, system } from "./script";
import type { SeatId } from "./types";

export class Actor {
	expression(exp: string) {
		log(`${this.constructor.name.toLowerCase()}: expression ${exp}`);
		return this;
	}

	say(text: string) {
		log(`${this.constructor.name.toLowerCase()}: say ${text}`);
		return this;
	}
}

class Makoto extends Actor {
	/**
	 * ![Makoto's expressions](expressions/makoto.png)
	 */
	expression(exp: "fists" | "uhh" | "what" | "but" | "think") {
		super.expression(exp);
		return this;
	}
}

class Hina extends Actor {
	/**
	 * ![Hina's expressions](../sprites/Aoi.png)
	 */
	expression(exp: "rage" | "what") {
		super.expression(exp);
		return this;
	}
}

class Hifumi extends Actor {
	/**
	 * ![Hifumi's expressions](../sprites/Hifumi.png)
	 */
	expression(exp: "rage" | "what") {
		super.expression(exp);
		return this;
	}
}

const actors = {
	makoto: new Makoto(),
	hina: new Hina(),
	hifumi: new Hifumi(),
};

export function actor<K extends keyof typeof actors>(
	name: K,
	seat?: SeatId,
): (typeof actors)[K] {
	if (seat) system.assign(name, seat);
	return {
		makoto: new Makoto(),
		hina: new Hina(),
		hifumi: new Hifumi(),
	}[name];
}
