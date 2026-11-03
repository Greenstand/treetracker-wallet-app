const stringToProcess = process.argv[2];
console.log(
  stringToProcess
    .split(/([A-Z][a-z]+)/)
    .filter((e) => {
      return e;
    })
    .map((e) => e.toLowerCase())
    .join(' '),
);
