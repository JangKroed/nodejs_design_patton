import { EventEmitter } from "events";
import { readFile, readFileSync } from "fs";

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    for (const file of this.files) {
      readFile(file, "utf8", (err, content) => {
        if (err) {
          return this.emit("error", err);
        }

        this.emit("fileread", file);

        const match = content.match(this.regex);
        if (match) {
          match.forEach((elem) => this.emit("found", file, elem));
        }
      });
    }

    return this;
  }
}

const findRegexInstance = new FindRegex(/hello \w+/);
findRegexInstance
  .addFile("fileA.txt")
  .addFile("fileB.json")
  .find()
  // .on("fileread", (file) => console.log(`${file} was read`))
  .on("found", (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on("error", (err) => console.error(`Error emitted ${err.message}`));

class FindRegexSync extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    for (const file of this.files) {
      let content;
      try {
        content = readFileSync(file, "utf8");
      } catch (err) {
        this.emit("error", err);
      }

      this.emit("fileread", file);

      const match = content.match(this.regex);
      if (match) {
        match.forEach((elem) => this.emit("found", file, elem));
      }
    }

    return this;
  }
}

const findRegexSyncInstance = new FindRegexSync(/hello \w+/);
findRegexSyncInstance
  .addFile("fileA.txt")
  .addFile("fileB.json")
  // 리스너가 호출됨
  .on("found", (file, match) => console.log(`[Before] Matched "${match}"`))
  .find()
  // 이 리스너는 절대 호출 안됨
  .on("found", (file, match) => console.log(`[After] Matched "${match}"`));
