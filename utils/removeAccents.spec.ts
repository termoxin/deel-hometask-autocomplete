import { removeAccents } from "./removeAccents";

describe("removeAccents", () => {
  test("should return string with removed accents/diacritics", () => {
    expect(removeAccents("Ștefan Vodă")).toBe("Stefan Voda");
  });
});
