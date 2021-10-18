/* eslint-disable @typescript-eslint/no-var-requires */

import fs from "fs";
import path from "path";

const getFiles = (rootDir: string): string[] => {
  const files = fs.readdirSync(rootDir);
  let filePaths = files.map((subject) => {
    if (fs.lstatSync(path.join(rootDir, subject)).isDirectory()) {
      const dive = getFiles(path.join(rootDir, subject));
      return dive;
    } else {
      if (subject.endsWith(".tsx")) {
        return path.join(rootDir, subject);
      } else {
        return undefined;
      }
    }
  });
  let filteredFilePath: (string | string[])[] = filePaths.filter(
    (subject): subject is string | string[] => {
      return !!subject;
    }
  );

  let flatFilePaths = filteredFilePath.reduce((a: string[], b, n) => {
    if (typeof b === "string") {
      return a.concat(b);
    }
    return a.concat(...b);
  }, []);
  return flatFilePaths;
};

const myArgs: String[] = process.argv;

const sourceInput = myArgs[2].toString();
const sourcePath = path.normalize(sourceInput);
const doesExist = fs.existsSync(sourcePath);

if (doesExist) {
  console.log(getFiles(sourcePath));
} else {
  console.warn("No Directory found at specified location ", sourcePath);
}
