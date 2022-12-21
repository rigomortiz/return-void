const generator = require('placeholder-img-generator');
const fs = require("fs");

generator.matrix().then((buffer) => {
  fs.writeFile(`./matrix.png`, buffer, () => {
    console.log('finished generating!')
  });

})
