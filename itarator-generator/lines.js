function* lineIterator(lines) {
  let i = 0;
  while (i < lines.length) {
    let indexOfNextLine = lines.indexOf("\n", i + 1);
    indexOfNextLine = indexOfNextLine === -1 ?  lines.length : indexOfNextLine;

    yield lines.slice(i, indexOfNextLine);
    i = indexOfNextLine + 1;
  }
}

const main = () => {
  const x = lineIterator("This\nis\nLines Iterator");
  console.log([...x]);
};

main();
