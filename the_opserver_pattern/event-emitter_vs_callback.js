import { EventEmitter } from "events";

function helloEvents() {
  const eventEmitter = new EventEmitter();
  setTimeout(
    () => eventEmitter.emit("complete", "helloEvents hello world"),
    100,
  );
  return eventEmitter;
}

function helloCallback(cb) {
  setTimeout(() => cb(null, "helloCallback hello world"), 100);
}

helloEvents().on("complete", console.log);
helloCallback((err, message) => console.log(message));
