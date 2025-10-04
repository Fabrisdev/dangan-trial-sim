import { actor } from "./actors";
import { camera, system } from "./script";

const hina = actor("hina", 0);
const makoto = actor("makoto", 1);
const hifumi = actor("hifumi", 2);

camera.focusOn(hina);
makoto.expression();

hina
	.expression("excited")
	.say(
		"But Makoto did it, didn't he? After all, the murder was commited in his room...",
	);
system.wait(2.5);
hina.expression("angry").say("You're just the worst!");
system.wait(2);
camera.focusOn(makoto);
makoto.say("fuck you hina hope you get killed soon");
system.wait(2);
camera.focusOn(hina);
hina.say("yeah, BY YOU!");
system.wait(1.5);
camera.focusOn(makoto);
makoto.expression("shoot").say("...");
system.wait(1);
camera.focusOn(hifumi);
hifumi.say("hey guys why dont we calm down a li-");
system.wait(0.8);
camera.focusOn(makoto);
makoto.expression("you").say("SHUT THE FUCK UP");
