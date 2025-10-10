import type { Actor } from "./actors";
import { log } from "./script";
import type { CharacterName, SeatId } from "./types";

class System {
	assign(actor: Actor | CharacterName, seat: SeatId) {
		log(
			`system: assign ${typeof actor === "string" ? actor : actor.constructor.name.toLowerCase()}:${seat}`,
		);
		return this;
	}
	wait(seconds: number) {
		log(`system: wait ${seconds}s`);
		return this;
	}
	debug() {
		log("system: show_debug");
	}
}

class Camera {
	focusOn(actor: Actor) {
		log(`camera: focus_on ${actor.constructor.name.toLowerCase()}`);
		return this;
	}
}

export const camera = new Camera();
export const system = new System();
