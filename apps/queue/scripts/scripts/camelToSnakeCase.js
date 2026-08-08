const stringToProcess = process.argv[2];
console.log(
  stringToProcess.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
);
