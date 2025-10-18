import { system as _system, actor, camera } from "dangan-trial-maker";

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
narrator.say("What do you think? Will you do it?", { await: false });
system.wait(2);
const answer = system.choose(["Yes", "No"]);

if (answer === "Yes") {
	makoto.say("Thank you!");
} else {
	makoto.say("Ow, really?");
}
