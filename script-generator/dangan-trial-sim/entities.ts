import type { Actor } from "./actors";
import { log, pop } from "./script";
import type { CharacterName, SeatId } from "./types";

class System<Tags extends string = never> {
	private preloadedFiles: Record<string, string> = {};

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
	stopAllTracks() {
		log("system: stop_tracks");
		return this;
	}
	setMouseColor(color: "yellow" | "green" | "blue") {
		log(`system: set_mouse_color ${color}`);
		return this;
	}
	choose<Option extends string>(options: Option[]): Option {
		const optionsWithoutSpaces = options.map((option) =>
			option.replaceAll(" ", "_"),
		);
		log(`system: choose ${optionsWithoutSpaces.join(" ")}`);
		return options[0];
	}
	if(_: string, value: string, f: () => void) {
		log(`system: ifanswer ${value}`);
		f();
		log(`system: endif`);

		return {
			else: (y: () => void) => {
				pop();
				log(`system: else`);
				y();
				log(`system: endif`);
				return this;
			},
		};
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

	showUi(bool: boolean) {
		log(`system: show_ui ${bool}`);
		return this;
	}

	run(game: Tags) {
		log(`system: play ${this.preloadedFiles[game]}`);
		return this;
	}
}

class Camera {
	focusOn(actor: Actor) {
		log(`camera: focus_on ${actor.constructor.name.toLowerCase()}`);
		return this;
	}
	setNarratorView(bool: boolean) {
		log(`camera: set_narrator_view ${bool ? "true" : "false"}`);
		return this;
	}
	/**
	 * Helper function for more easily swapping between normal and narrator view.
	 * @param f Callback function with all the things to do while on narrator view. Must return an actor you wish to focus the camera on afterwards.
	 */
	narratorView(f: () => Actor) {
		this.setNarratorView(true);
		const actor = f();
		camera.focusOn(actor);
		this.setNarratorView(false);
	}
}

export const camera = new Camera();
export const system = new System();

type AudioOptions = {
	loop: boolean;
};
