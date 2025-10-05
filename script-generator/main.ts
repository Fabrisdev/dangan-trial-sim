import { actor } from "./actors";
import { camera, system } from "./script";

const hina = actor("hina", 0);
const makoto = actor("makoto", 1);
const hifumi = actor("hifumi", 2);

camera.focusOn(hina);
hina
	.expression("yell")
	.say(
		"But Makoto did it, didn't he? After all, the murder was commited in his room...",
	);
system.wait(2.5);
hina.expression("mad").say("You're just the worst!");
camera.focusOn(makoto);
makoto.say("fuck you hina hope you get killed soon");
camera.focusOn(hina);
hina.say("yeah, BY YOU!");
camera.focusOn(makoto);
makoto.expression("shoot").say("...");
camera.focusOn(hifumi);
hifumi.say("hey guys why dont we calm down a li-");
system.wait(0.8);
camera.focusOn(makoto);
makoto.expression("you").say("SHUT THE FUCK UP");
