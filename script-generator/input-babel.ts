//input

import { actor, system } from "dangan-trial-maker";

const makoto = actor("makoto");

const answ = system.ask(["Yes", "No"]);
if (answ === "Yes") {
	system.wait(1);
	makoto.say("siiii");
}

//transpilación de babel

const _makoto = actor("makoto");

const _answ = system.ask(["Yes", "No"]);
system.if(_answ, "Yes", () => {
	system.wait(1);
	_makoto.say("siiii");
});

/*output final

system: ask Yes No
system: ifanswer Yes
system: wait 1s
makoto: say siiii
system: endif

*/
