 import assert from "node:assert";
import test from "node:test";
import { getCommemorativeDate, formatDate } from "./common.mjs";



// Test 1: Check getCommemorativeDate for last Friday of October 2025
test("getCommemorativeDate returns correct last Friday of October 2025", () => {
  const entry = {
    name: "World Lemur Day",
    monthName: "October",
    dayName: "Friday",
    occurence: "last",
    descriptionURL: ""
  };
  const result = getCommemorativeDate(entry, 2025);
  assert.equal(result.getFullYear(), 2025);
  assert.equal(result.getMonth(), 9); // October
  assert.equal(result.getDay(), 5);   // Friday
  assert.equal(result.getDate(), 31); // Last Friday of Oct 2025
});
