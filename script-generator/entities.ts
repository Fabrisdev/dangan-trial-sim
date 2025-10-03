import { log } from "./script";
import type { CharacterName, Expression, SeatId } from "./types";

export class System {
	assign(actor: Actor, seat: SeatId) {
		log(`system: assign ${actor.name}:${seat}`);
		return this;
	}
	wait(seconds: number) {
		log(`system: wait ${seconds}s`);
		return this;
	}
}

export class Camera {
	focusOn(actor: Actor) {
		log(`camera: focus_on ${actor.name}`);
		return this;
	}
}

export class Actor {
	name;

	constructor(name: CharacterName) {
		this.name = name;
	}

	expression(exp: Expression) {
		log(`${this.name}: expression ${exp}`);
		return this;
	}

	say(text: string) {
		log(`${this.name}: say ${text}`);
		return this;
	}
}
