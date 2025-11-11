const interns = [
  { name: "Sidhartha", state: "WB" },
  { name: "Abc", state: "WB" },
  { name: "xyz", state: "KL" },
  { name: "mno", state: "UP" },
];

const internsFromWB = interns.filter((intern) => intern.state === "WB");
console.log(internsFromWB);
