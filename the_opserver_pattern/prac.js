// 3.2 Ticker
import { EventEmitter } from "events";

function ticker(number, cb) {
  // 매 50ms마다 tick이라는 이벤트를 생성

  // number만큼 밀리초가 지났을때 tick 이벤트가 일어난 횟수를 callback
  const emitter = new EventEmitter();
  let count = 0;
  let second = 0;

  while (number > second) {
    setTimeout(() => {
      emitter.emit("tick");
    }, 50);
    second += 50;
    count++;
  }

  cb(count);
}

ticker(200, console.log);

function ticker2(number, cb) {
  // 매 50ms마다 tick이라는 이벤트를 생성

  // number만큼 밀리초가 지났을때 tick 이벤트가 일어난 횟수를 callback
  const emitter = new EventEmitter();
  let count = 0;
  let second = 0;

  while (number > second) {
    emitter.emit("tick");
    second += 50;
    count++;
  }

  cb(count);
}

ticker2(200, console.log);

function tickerError(number, cb) {
  // 매 50ms마다 tick이라는 이벤트를 생성

  // number만큼 밀리초가 지났을때 tick 이벤트가 일어난 횟수를 callback
  const emitter = new EventEmitter();
  let count = 0;
  let second = 0;

  while (number > second) {
    if (Date.now() % 5 === 0) {
      const err = new Error("Error!");
      emitter.emit("error", err);
      cb(err);
      break;
    }

    emitter.emit("tick");
    second += 50;
    count++;
  }

  cb(count);
}

tickerError(200, console.log);
