import { actor, camera, system } from "dangan-trial-maker";
import { bold, narrate, think } from "dangan-trial-maker/bb";

system.debug();
const narrator = actor("narrator");
system.assign("hina", 1);
system.assign("mondo", 2);
system.assign("kyoko", 3);
system.assign("sakura", 4);
system.assign("kiyotaka", 6);
system.assign("makoto", 8);
system.assign("hifumi", 9);
system.assign("toko", 10);
system.assign("leon", 11);
system.assign("celeste", 12);
system.assign("chihiro", 13);
system.assign("byakuya", 14);
system.assign("yasuhiro", 15);

narrator.say(
	"You'll have to rely on your own ",
	bold("logic"),
	" to determine which weak spots are actually ",
	bold("lies or contradictions"),
	".",
);
