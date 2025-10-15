import { system as _system, actor, camera } from "dangan-trial-maker";
import { bold } from "dangan-trial-maker/bb";

const system = _system.preload({
	path: "user://underground.mp3",
	tag: "underground_theme",
});
const narrator = actor("narrator");
system.assign("hina", 1);
system.assign("mondo", 2);
system.assign("kyoko", 3);
system.assign("sakura", 4);
system.assign("kiyotaka", 6);
system.assign("hifumi", 9);
system.assign("toko", 10);
system.assign("leon", 11);
system.assign("celeste", 12);
system.assign("chihiro", 13);
system.assign("byakuya", 14);
system.assign("yasuhiro", 15);

const makoto = actor("makoto", 8);
camera.focusOn(makoto);
makoto.expression("hm");
makoto.think('Kyoko said it was a "bewildering act"...');
makoto.think(
	"I almost didn't notice it at first, but...is that the key point here?",
);
camera.narratorView(() => {
	system.play("underground_theme", {
		loop: true,
	});
	narrator.say(
		"There's a ",
		bold("bit more to learn"),
		" about Nonstop Debates. Would you like to hear more?",
	);
	narrator.say(
		"From here on out, the number of weak spots will start going up.",
	);
	narrator.say(
		"But no matter how many weak spots, there's essentially only one ",
		bold("lie or contradiction"),
		" in that debate.",
	);
	narrator.say(
		"What I'm trying to say is, not all weak spots you see are necessarily false.",
	);
	narrator.say(
		"You'll have to rely on your own ",
		bold("logic"),
		" to determine which weak spots are actually ",
		bold("lies or contradictions"),
		".",
	);
	return makoto;
});

system.stopTracks();
makoto.say("Hola de nuevo");
