import { EventEmitter } from "events";

const emitter = new EventEmitter();

// emitter.setMaxListeners(10);

const thisTakesMemory = "A big string...";
const listener = () => {
  console.log(thisTakesMemory);
};
emitter.on("an_event", listener);
// emitter.once("an_event", listener);

emitter.removeListener("an_event", listener);
