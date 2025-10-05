# Install instructions
1. Go inside the project. This is where you'll write your scripts.
```bash
cd script-generator #or from wherever you are
```
2. Install dependencies
```bash
npm install
```
3. Link the library to where your scripts are located
```bash
npm link dangan-trial-sim
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
## Code example
```ts
import { actor, camera } from 'dangan-trial-sim'

const hina = actor('hina', 3) 

camera.focusOn(hina)
hina.expression("eheh")
hina.say("I'm Aoi Asahina. But my friends just call me Hina")
```
For more examples please see the included `my_script.ts` file.