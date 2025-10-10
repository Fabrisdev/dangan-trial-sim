import { actor, camera, system } from "dangan-trial-maker";
import { bold, narrate, think } from "dangan-trial-maker/bb";

const narrator = actor("narrator");
narrator.say(
	"You'll have to rely on your own ",
	bold("logic"),
	" to determine which weak spots are actually ",
	bold("lies or contradictions"),
	".",
);
