import { Proof } from "types";

export function sortByID(a: Proof, b: Proof): number {
  // Sort by ID, where ID is of the format {x.y.z}
  // where x, y, and z are numbers
  // Sorts in descending order
  // e.g. 1.2.3 > 1.2.2 > 1.2.1 > 1.1.1 > 1.1.0 > 1.0.0
  const aID = a.id.split(".");
  const bID = b.id.split(".");
  for (let i = 0; i < aID.length; i++) {
    if (parseInt(aID[i]) > parseInt(bID[i])) {
      return -1;
    } else if (parseInt(aID[i]) < parseInt(bID[i])) {
      return 1;
    }
  }
  return 1;
}
