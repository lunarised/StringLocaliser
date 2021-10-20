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
      if (subject.endsWith(".test.tsx") || subject.endsWith(".it-test.tsx")) {
        return undefined;
      }
      if (subject.endsWith(".tsx")) {
        return path.join(rootDir, subject);
      } else {
        return undefined;
      }
    }
  });
  const filteredFilePath: (string | string[])[] = filePaths.filter(
    (subject): subject is string | string[] => {
      return !!subject;
    }
  );

  const flatFilePaths = filteredFilePath.flatMap((a) => a);
  return flatFilePaths;
};

const myArgs: String[] = process.argv;

const sourceInput = myArgs[2].toString();
const sourcePath = path.normalize(sourceInput);
const doesExist = fs.existsSync(sourcePath);
let count = 0;
if (doesExist) {
  getFiles(sourcePath).forEach((line) => {
    console.log(line);
    count++;
  });
  console.log(count);
} else {
  console.warn("No Directory found at specified location ", sourcePath);
}
