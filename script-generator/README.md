# Install instructions
1. Go inside the project. This is where you'll write your scripts.
```bash
cd script-generator #or from wherever you are
```
2. Install dependencies
```bash
npm install
```

# Usage instructions
From there you can start making your own scripts. Start by creating a new Typescript file inside the project's folder.
```ts
import { actor } from 'dangan-trial-sim'

// Get makoto instance and sit him in the first seat (available seats are 0-15)
const makoto = actor('makoto', 0) 
```
or alternatively you can use
```ts
import { system, actor } from 'dangan-trial-sim'

const makoto = actor('makoto') // Get makoto instance
system.assign(makoto, 0) //Sit him in the first seat
```

## Questions (if)
There's two ways to ask a question in-game. You can either do this
```ts
import { actor, system } from 'dangan-trial-sim'

const narrator = actor('narrator')
narrator.say('What do you think? Will you do it?')

const answer = system.ask(['Yes', 'No'])

system.if(answer, "Yes", () => {
  narrator.say('Thank you!')
}).else(() => {
  narrator.say('Ow, really?')
})
```
Or... you can just directly use Javascript's IF statement!
```ts
import { actor, system } from 'dangan-trial-sim'

const narrator = actor('narrator')
narrator.say('What do you think? Will you do it?')

const answer = system.ask(['Yes', 'No'])

if(answer === 'Yes'){
  narrator.say('Thank you!')
}else{
  narrator.say('Ow, really?')
}
```
Please note that if you're using the IF statement version, the left side of the if statement has to be like this for the transpiler to be able to understand it
```ts
answer === "Yes" // ✅
answer !== "No" // ❌ won't transpile, compiler only searches for '==='
"Yes" === answer // ❌ won't transpile, compiler needs value to check to be on the right
```
Also note that the variable on the left nor it's name actually matters at all.
```ts
//this line compiles to
if(answer === "Okay, I'll do it") // -> ifanswer Okay I'll do it
//note how the variable is not there anymore
```
Therefore, it is very important to take into account that the only thing that actually matters is the last time you called `system.choice`. The system only tracks the last value inputted and not any previous ones.

This will be fixed in the future as the compiler advances. In the mean time, if you're using the callback version you don't need to worry about any of this.

## Code example
```ts
import { actor, camera } from 'dangan-trial-sim'

const hina = actor('hina', 3) 

camera.focusOn(hina)
hina.expression("eheh")
hina.say("I'm Aoi Asahina. But my friends just call me Hina")
```
For more examples please see the included `my_script.ts` file.
## Build file
After writing your script you can build it by running
```bash
npx tsx dangan-trial-sim/compiler.ts --input SCRIPT_FILE_NAME.ts --output OUTPUT_FILE_NAME
```
For example, if you have a `my_script.ts` you can compile it with
```bash
npx tsx dangan-trial-sim/compiler.ts --input my_script.ts --output my_trial.trial
```
(Note that the .trial extension is not obligatory).

This will generate an `output.trial` file inside your `CWD` which you can then set as the script file inside Godot.

Alternatively, if your script file is `my_script.ts` you can just run it with the shortcut
```bash
npm run build
```
which is just an alias for the previous mentioned command.

# Extra
Here's some extra stuff you might find useful.
- ## Order of characters in Danganronpa
  This is the real order in which the characters sit in DR1 (first class trial). You can just copy and paste this into your script if you wish to correctly replicate where they sit.
  ```ts
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
  ```