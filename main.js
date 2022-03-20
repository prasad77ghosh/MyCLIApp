#!/usr/bin/env node

let helpFun = require("./commands/help");
let orgFunc = require("./commands/organize");

let treeFn = require("./commands/tree");

let inputArr = process.argv.slice(2);

let command = inputArr[0];

let path = inputArr[1];

switch (command) {
  case "help":
    // call help function
    helpFun.help();
    break;
  case "organize":
    // call organize function
    orgFunc.organize(path);
    break;
  case "tree":
    // call tree function
    treeFn.tree(path);
    break;
  default:
    console.log("command did not recognized:/");
    break;
}
