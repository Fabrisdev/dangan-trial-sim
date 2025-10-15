import { system as _system, actor, camera } from "dangan-trial-maker";
import { bold, narrate, think } from "dangan-trial-maker/bb";

const system = _system.preload({
	path: "user://underground.mp3",
	tag: "underground_theme",
});
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

system.play("underground_theme", {
	loop: true,
});
narrator.say(
	"You'll have to rely on your own ",
	bold("logic"),
	" to determine which weak spots are actually ",
	bold("lies or contradictions"),
	".",
);
narrator.say("hello????????????????");
narrator.say("you hear me my guy?");
