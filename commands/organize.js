
let fs = require("fs");
let path = require("path");

let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  images: ["png", "jpg", "jpeg"],
};

function organize(sourcePath) {
  if (sourcePath == undefined) {
    sourcePath = process.cwd(); //cwd = current working directory
  }

  //it join organize_files to sourcePth
  let organizeFiles = path.join(sourcePath, "organize_files");

  //if organize file do not exist then create it
  if (fs.existsSync(organizeFiles) == false) {
    fs.mkdirSync(organizeFiles);
  } else {
    console.log("folder already exists");
  }

  //Reads the contents of the directory
  let allFiles = fs.readdirSync(sourcePath);

  for (let i = 0; i < allFiles.length; i++) {
    //   let ext = allFiles[i].split(".")[1];(or)
    // let ext = path.extname(allFiles[i]);
    // console.log(ext);

    // get full path of target file and folder in sourcepath
    let fullPathOfFile = path.join(sourcePath, allFiles[i]);

    //chek file and folder
    let isFile = fs.lstatSync(fullPathOfFile).isFile();
    // console.log(allFiles[i] + " is " + isFile);

    //get extension of all file without "."
    if (isFile) {
      let ext = path.extname(allFiles[i]).split(".")[1];

      //get foldername where i can paste my file
      let folderName = getFolderName(ext);

      //copy file from srocefile to destination folderName
      copyFileToDest(sourcePath, fullPathOfFile, folderName);
    }
  }
}

function getFolderName(ext) {
  // here we apply 2d array in types object to find foldername of to pastefile
  for (let key in types) {
    // console.log(key);
    for (let i = 0; i < types[key].length; i++) {
      if (types[key][i] == ext) {
        return key;
      }
    }
  }
  return "miscellaneous"
}

function copyFileToDest(sourcePath, fullPathOfFile, folderName) {
  //here i create destination folder path by join path
  let destFolderPath = path.join(sourcePath, "organize_files", folderName);

  //here i check destination folder path exists or not if not exist than create it
  if (!fs.existsSync(destFolderPath)) {
    fs.mkdirSync(destFolderPath);
  }

  //here i get file name from fullPathOfFile
  let fileName = path.basename(fullPathOfFile);

  //
  let destFilePath = path.join(destFolderPath, fileName);
  fs.copyFileSync(fullPathOfFile, destFilePath);
}

// let sourcePath = "C:\\Users\\91907\\Downloads";
// organize(sourcePath);

module.exports = {
  organize:organize
}
