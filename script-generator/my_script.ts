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
makoto.think('Kyoko said it was a "bewildering act"...');
makoto.think(
	"I almost didn't notice it at first, but... is that the key point here?",
);
camera.narratorView(() => {
	narrator.say(
		"There's" +
			bold(" a bit more to learn ") +
			"about Nonstop Debates. Would you like to hear more?",
		{ await: false },
	);
	system.wait(0.2);
	const answer = system.choose(["Not at all!", "Absolutely!"]);
	if (answer === "Absolutely!") {
		narrator.say("Thank you!");
		narrator.say("Thank you for choosing yes!");
		narrator.say("You're my guy bro!");
		narrator.say("Here comes another question btw");
		narrator.say("Are you over 18?", { await: false });
		const b = system.choose(["Yes", "hell nah bro"]);
		if (b === "Yes") {
			narrator.say("oh, cool!");
		} else {
			narrator.say("get the hell outta here ma boy");
		}
	} else {
		narrator.say("Ow, really?");
		narrator.say("Grrr");
		narrator.say("I hate you");
	}
	narrator.say("This is after the if");
	return makoto;
});
