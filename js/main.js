"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getFiles = function (rootDir) {
    var files = fs_1.default.readdirSync(rootDir);
    var filePaths = files.map(function (subject) {
        if (fs_1.default.lstatSync(path_1.default.join(rootDir, subject)).isDirectory()) {
            var dive = getFiles(path_1.default.join(rootDir, subject));
            return dive;
        }
        else {
            if (subject.endsWith(".test.tsx") || subject.endsWith(".it-test.tsx")) {
                return undefined;
            }
            if (subject.endsWith(".tsx")) {
                return path_1.default.join(rootDir, subject);
            }
            else {
                return undefined;
            }
        }
    });
    var filteredFilePath = filePaths.filter(function (subject) {
        return !!subject;
    });
    var flatFilePaths = filteredFilePath.reduce(function (a, b, n) {
        return a.concat(b);
    }, []);
    return flatFilePaths;
};
var myArgs = process.argv;
var sourceInput = myArgs[2].toString();
var sourcePath = path_1.default.normalize(sourceInput);
var doesExist = fs_1.default.existsSync(sourcePath);
var count = 0;
if (doesExist) {
    getFiles(sourcePath).forEach(function (line) {
        console.log(line);
        count++;
    });
    console.log(count);
}
else {
    console.warn("No Directory found at specified location ", sourcePath);
}
