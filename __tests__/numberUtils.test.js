import { isNumeric } from "../utils/numberUtils";

describe("isNumeric", () => {
  test("1 is numeric", () => {
    expect(isNumeric("1")).toBeTruthy();
  });

  test("1.12 is numeric", () => {
    expect(isNumeric("1.12")).toBeTruthy();
  });

  test("10aa is not numeric", () => {
    expect(isNumeric("10aa")).toBeFalsy();
  });
});
