import { actor, camera, system } from "./script";

const hina = actor("hina");
const makoto = actor("makoto");
const hifumi = actor("hifumi");

camera.focusOn(hina);
hina.expression("excited");
hina.say(
	"But Makoto did it, didn't he? After all, the murder was commited in his room...",
);
system.wait(2.5);
hina.expression("angry");
hina.say("You're just the worst!");
system.wait(2);
camera.focusOn(makoto);
makoto.say("fuck you hina hope you get killed soon");
system.wait(2);
camera.focusOn(hina);
hina.say("yeah, BY YOU!");
system.wait(1.5);
camera.focusOn(makoto);
makoto.expression("shoot");
makoto.say("...");
system.wait(1);
camera.focusOn(hifumi);
hifumi.say("hey guys why dont we calm down a li-");
system.wait(0.8);
camera.focusOn(makoto);
makoto.expression("you");
makoto.say("SHUT THE FUCK UP");
