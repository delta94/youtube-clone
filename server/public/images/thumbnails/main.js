const testFolder = './';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file.split('.')[0]);
let temp  = file.split('.')[0] + '.png';
	fs.rename('./' + file, './' + temp, () => {});
  });
})