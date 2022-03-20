let fs = require("fs");
let path = require("path");

function treeFun(sourcePath) {
  if (sourcePath == undefined) {
    displayTree(process.cwd(), ""); //cwd = current working directory if sourcePath is undefined
    return;
  } else {
    let doesExist = fs.existsSync(sourcePath);

    //if source path is exist then display all the files and folders of that mian folder
    if (doesExist) {
      displayTree(sourcePath, "");
    } else {
      console.log("Path does not exist");
    }
  }
}

function displayTree(sourcePath, spaces) {
  let isFile = fs.lstatSync(sourcePath).isFile(); // check the given source path is file or folder

  if (isFile == true) {
    //if the source path is a path of an file then show it
    let fileName = path.basename(sourcePath);

    console.log(spaces + "|--" + fileName);
  } else {
    //if the source path is a path of an folder then print it and check inside the folder again by recursion
    let folderName = path.basename(sourcePath);
    console.log(spaces + "|____" + folderName);

    let allChild = fs.readdirSync(sourcePath);

    for (child of allChild) {
      let fullPathOfChild = path.join(sourcePath, child);

      //here i call function inside the same function

      displayTree(fullPathOfChild, spaces + "\t");
    }
  }
}

//here we export tree function

module.exports = {
  tree:treeFun
}

