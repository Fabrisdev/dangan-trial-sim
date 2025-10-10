import { narrate } from "./bb";
import { system } from "./entities";
import { log } from "./script";
import type { HinaExpressions, MakotoExpressions, SeatId } from "./types";

export class Actor {
	expression(exp: string) {
		log(`${this.constructor.name.toLowerCase()}: expression ${exp}`);
		return this;
	}

	say(...text: string[]) {
		log(`${this.constructor.name.toLowerCase()}: say ${text.join("")}`);
		return this;
	}
}

class Makoto extends Actor {
	/**
	 * ![Makoto's expressions](expressions/makoto.png)
	 */
	expression(exp: MakotoExpressions) {
		super.expression(exp);
		return this;
	}
}

class Hina extends Actor {
	/**
	 * ![Hina's expressions](expressions/Hina.png)
	 */
	expression(exp: HinaExpressions) {
		super.expression(exp);
		return this;
	}
}

class Hifumi extends Actor {
	/**
	 * ![Hifumi's expressions](../sprites/Hifumi.png)
	 */
	expression(exp: never) {
		super.expression(exp);
		return this;
	}
}

class Narrator {
	say(...text: string[]) {
		log(`narrator: say ${narrate(text.join(""))}`);
		return this;
	}
}

const actors = {
	makoto: new Makoto(),
	hina: new Hina(),
	hifumi: new Hifumi(),
	narrator: new Narrator(),
};

export function actor<K extends keyof typeof actors>(
	name: K,
	seat?: SeatId,
): (typeof actors)[K] {
	if (seat !== undefined) system.assign(name, seat);
	return actors[name];
}
