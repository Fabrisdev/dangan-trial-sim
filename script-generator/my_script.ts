import { actor, camera, system } from "dangan-trial-maker";
import { bold, narrate, think } from "dangan-trial-maker/bb";

const narrator = actor("narrator");
system.assign("yasuhiro", 1);
system.assign("chihiro", 2);
system.assign("byakuya", 3);
system.assign("celeste", 4);
system.assign("leon", 5);
system.assign("toko", 6);
system.assign("hifumi", 7);
system.assign("makoto", 8);
system.assign("kiyotaka", 10);
system.assign("sakura", 12);
system.assign("kyoko", 13);
system.assign("mondo", 14);
system.assign("hina", 15);

narrator.say(
	"You'll have to rely on your own ",
	bold("logic"),
	" to determine which weak spots are actually ",
	bold("lies or contradictions"),
	".",
);
