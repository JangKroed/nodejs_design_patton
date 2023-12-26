import { readFile, readFileSync } from "fs";

const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // 동기적으로 호출
    cb(cache.get(filename));
  } else {
    // 비동기 함수
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

const reader1 = createFileReader("data.txt");
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`);

  const reader2 = createFileReader("data.txt");
  reader2.onDataReady((data) => {
    console.log(`Second call data: ${data}`);
  });
});

function consistentReadSync(filename) {
  if (cache.has(filename)) {
    return cache.get(filename);
  } else {
    const data = readFileSync(filename, "utf8");
    cache.set(filename, data);
    return data;
  }
}

const reader3 = consistentReadSync("data.txt");
console.log(`Third call data: ${reader3}`);

function consistentReadAsync(filename, callback) {
  if (cache.has(filename)) {
    // 지연된 콜백 호출
    process.nextTick(() => callback(cache.get(filename)));
  } else {
    // 비동기 함수
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      callback(data);
    });
  }
}

function createFileReaderAsync(filename) {
  const listeners = [];
  consistentReadAsync(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

const reader4 = createFileReaderAsync("data.txt");
reader4.onDataReady((data) => {
  console.log(`4 call data: ${data}`);

  const reader5 = createFileReaderAsync("data.txt");
  reader5.onDataReady((data) => {
    console.log(`5 call data: ${data}`);
  });
});