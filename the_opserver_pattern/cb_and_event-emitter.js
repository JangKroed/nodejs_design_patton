import { glob } from "glob";

// const eventEmitter = glob(pattern, [options], callback)
const a = glob("*.txt", (err, files) => {
  if (err) {
    return console.error(err);
  }
  console.log(`All files found: ${JSON.stringify(files)}`);
}); //.on("match", (match) => console.log(`Match found: ${match}`));

a.then(console.log);
