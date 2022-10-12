import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default app => {
  // console.log('__dirname====>', __dirname)
  // return false;
  fs.readFileSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js')))
    .forEach(file => require(path.resolve(__dirname, file))(app))
}

// fs.readdir(directoryPath, function (err, files) {
//   //handling error
//   if (err) {
//       return console.log('Unable to scan directory: ' + err);
//   } 
//   //listing all files using forEach
//   files.forEach(function (file) {
//     require(path.resolve(__dirname, file)) 
//   });
// });