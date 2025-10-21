import { system as _system, actor, camera } from "dangan-trial-maker";
import { bold } from "dangan-trial-maker/bb";

const system = _system
	.preload({
		path: "user://underground.mp3",
		tag: "underground_theme",
	})
	.preload({
		path: "user://my_nonstop.yaml",
		tag: "my_nonstop",
	});

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
makoto.think("welp lets start it");

system.run("my_nonstop");
