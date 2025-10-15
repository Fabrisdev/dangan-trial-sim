import type { Actor } from "./actors";
import { log } from "./script";
import type { CharacterName, SeatId } from "./types";

class System<Tags extends string = never> {
	preloadedFiles: Record<string, string> = {};

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
		return this;
	}
	/**
	 * Plays any already preloaded audio track. Supports WAV, OGG and MP3 audio.
	 * @param audioTag Tag to the audio track.
	 */
	play(audioTag: Tags, options?: AudioOptions) {
		log(
			`system: play ${this.preloadedFiles[audioTag]} ${options?.loop ? "loop" : ""}`,
		);
		return this;
	}

	/**
	 * Preloads any file into the game.
	 * @param path Path to the file. Either use a global path or user:// and store it in Godot's user data folder. For more information read https://docs.godotengine.org/en/stable/tutorials/io/data_paths.html
	 * @param tag Tag for the file path. You'll have to use it later when referring to it.
	 * @returns
	 */
	preload<Tag extends string>({ path, tag }: { path: string; tag: Tag }) {
		log(`system: preload_file ${path}`);
		this.preloadedFiles[tag] = path;
		return this as System<Tags | Tag>;
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

type AudioOptions = {
	loop: boolean;
};
