import { actor, camera, system } from "dangan-trial-maker";
import { bold, narrate, think } from "dangan-trial-maker/bb";

const hina = actor("hina", 0);
hina.say(
	narrate(
		"You'll have to rely on your own ",
		bold("logic"),
		" to determine which weak spots are actually ",
		bold("lies or contradictions"),
		".",
	),
);
