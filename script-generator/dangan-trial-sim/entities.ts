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
	/**
	 * Plays any audio track. Supports WAV, OGG and MP3 audio.
	 * Either use a global path or user:// and store it in Godot's user data folder. For more information read https://docs.godotengine.org/en/stable/tutorials/io/data_paths.html
	 * Note: It's recommended to preload the audio first with system.preload()
	 * @param audioPath Path to the audio track.
	 */
	play(audioPath: string) {
		log(`system: play ${audioPath}`);
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
